const mongoose = require('mongoose');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
    passport.use('github', new GitHubStrategy({
        clientID: 'client-id',
        clientSecret: 'client-secret',
        callbackURL: 'http://localhost:3000/user/auth/github/callback' // "http://127.0.0.1:3000/"
      },
      (accessToken, refreshToken, profile, done) => {
          User.findOne({
              'github.id': profile.id
          }, function(err, user) {
              if (err) {
                  return done(err);
              }
              if (!user) {
                  user = new User({
                      githubId: profile.id,
                      username: profile.username
                  });
                  user.save(function(err) {
                      if (err) {
                          return err;
                      }
                      return done(err, user);
                  });
              } else {
                  return done(err, user);
              }
          });
      }
    ));

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      done(null, obj);
    });
}
