var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var Sequelize = require('sequelize');
var models = require('../models');
var logger  = require('../modules/logger');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    models.User.findOne({
      where: {
        id: id
      }
    })
    .then(function(user) {
      done(null, user);
    })
    .catch(function(error) {
      logger.app.error('Error in Saving user:', error);
      done(error);
    });
  });

  passport.use('login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      console.log('email:', email);
      console.log('password:', password);

      process.nextTick(function() {
        models.User.findOne({
          where: {
            email: email.toLowerCase()
          }
        })
        .then(function(user) {
          if (!user) {
            logger.app.error('User Not Found with email:', email.toLowerCase());
            req.flash('error', 'ユーザーが見つかりませんでした。');
            return done(null, false);
          }
          user.authenticate(password, function(err, isValid) {
            if (err) {
              logger.app.error('Error in Authenticate:', err.message);
              return done(null, false);
            }
            if (!isValid) {
              logger.app.error('Password Missmatch with email:', email);
              req.flash('error', 'パスワードが間違っています。');
              return done(null, false);
            }
            logger.app.debug('Password Match with email:', email);
            return done(null, user);
          });
        })
        .catch(function(error) {
          logger.app.error('Error in Login user:', error.message);
          return done(error);
        });
      });
    }
  ));

  passport.use('signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      console.log('new email:', email);
      console.log('new password:', password);
      console.log('new username:', req.body.username);

      process.nextTick(function() {
        if (!req.isAuthenticated()) {
          console.log('###### User is not Login:', req.isAuthenticated());

          models.User.findOne({
            where: {
              email: email.toLowerCase()
            }
          })
          .then(function(user) {
            if (user) {
              logger.app.error('User already exists:', user.username, user.email);
              req.flash('error', 'ユーザーが既に存在します。');
              return done(null, false, req);
            }
            models.User.create({
              username: req.body.username,
              email: email.toLowerCase(),
              passwordVirtual: password
            })
            .then(function(user) {
              logger.app.debug('User Registration succesful.');
              return done(null, user);
            })
            .catch(function(error) {
              logger.app.error('Error in Saving user:', error);
              return done(error);
            });
          })
          .catch(function(error) {
            logger.app.error('Error in Saving user:', error);
            return done(error);
          });
        }
        // 既にログイン済みの場合
        else {
          console.log('###### User is Login:', req.isAuthenticated());
          console.log('###### User:', req.user);
          return done(null, req.user);
        }
      });
    })
  );
};
