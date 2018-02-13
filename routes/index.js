
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-github').Strategy;

const Kit = require('../models/kit');

mongoose.connect('localhost:27017/starterkits');

router.get('/', (req, res, next) => { /* feature-note: by default the application should display
                                                the most recently submitted Starter Kit */
    Kit.find((err, docs) => {
        let kits = [];
        for (let i = 0; i < docs.length; i += 1) {
            kits.push(docs.slice(i, i + 1));
        }
        res.render('index', {
            kits: kits, signedIn: req.isAuthenticated(), user: req.user
        });
    });
});

module.exports = router;
