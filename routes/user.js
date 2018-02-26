/// New Product + Sign-in

const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Strategy = require('passport-github').Strategy;

const Kit = require('../models/kit');
const User = require('../models/user');

const csrfProtection = csrf();
router.use(csrfProtection);

mongoose.connect('localhost:27017/starterkits');

///*** Submit Starter Kit ***\\\
router.get('/submit', isLoggedIn, (req, res, next) => {
    res.render('user/submit', {csrfToken: req.csrfToken(), user: req.user } );
});

router.post('/submit/submitAction', isLoggedIn, (req, res, next) => {
    let kitObj = {
        author: req.body.h_author, // h_author: hidden-input-field
        name: req.body.name,
        link: req.body.link,
        environment: req.body.environment,
        subTool: req.body.subTool,
        setupTime: Number(req.body.setupTime),
        description: req.body.description
    };
    let kit = new Kit(kitObj);
    kit.save((err) => {
        if (err) {
            console.log(err);
            return;
         }
        res.redirect("/"); // kit successfully saved
    });
});

///*** Edit/Update Starter Kit ***\\\
router.get('/editKit/:id', isLoggedIn, (req, res, next) => {
    Kit.findById(req.params.id, (err, kit) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.render('user/editKitPage', {csrfToken: req.csrfToken(), kit: kit, user: req.user} );
    });
});

router.post('/editKit/submitAction', isLoggedIn,  (req, res, next) => {
    Kit.findOneAndUpdate({_id: req.body.db_doc_id}, { // db_doc_id & h_author are achieved as hidden input fields
        author: req.body.h_author,
        name: req.body.name,
        link: req.body.link,
        environment: req.body.environment,
        subTool: req.body.subTool,
        setupTime: Number(req.body.setupTime),
        description: req.body.description
    }, {upsert:true}, function(err, doc) {
        if (err) return res.send(500, { error: err });
        return res.redirect("/");
    });
});

///*** Remove Starter Kit ***\\\
router.get('/removeKit/:id', isLoggedIn, (req, res, next) => {
    Kit.findById(req.params.id, (err, kit) => {
        if (err) {
            console.log(err);
            return err;
        }
        User.findOne({'username': kit.author}, (err, user) => {
            if (err) {
                console.log(err);
                return err;
            }
            if (user.username == kit.author) { // might not need this
                Kit.findByIdAndRemove(req.params.id, (err, kit) => {
                    if (err) {
                        console.log(err);
                        res.send('Unable to remove this kit');
                        return err;
                    }
                    res.redirect('/');
                });
            } else {
                res.send('You\'are unable to remove this kit');
            }
        });
    });
});

///**************************\\\

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
    console.log("User no longer logged in");
});
router.use('/', notLoggedIn, (req, res, next) => {
    next();
});

router.get('/login', (req, res, next) => {
    var messages = req.flash('error'); // possibly dodn't need this
    res.render('user/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

/// Authenticate with Github
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github', (req, res) => {
    passport.authenticate('github');
});

// the following route is what is used after the user has been directed to Github's login page
router.get('/auth/github/callback',
    passport.authenticate('github', {
        successRedirect: '/user/index',
        failureRedirect: '/user/signin',
 }));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
