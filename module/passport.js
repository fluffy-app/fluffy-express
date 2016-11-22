var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var Sequelize = require('sequelize');
var models = require('../models');

module.exports = function(passport) {

  // Configure Passport authenticated session persistence.
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
      console.log('user: ', user);
      done(null, user);
    })
    .catch(function(error) {
      console.log('Error in Saving user: ', error);
      return done(error);
    });
  });

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      findOrCreateUser = function() {
        console.log('new username:  ', username);
        console.log('new password:  ', password);
        console.log('new email:  ', req.body.email);
        models.User.findOne({
          where: {
            username: username
          }
        })
        .then(function(user) {
          if (user) {
            console.log('User already exists');
            req.flash('message','User Already Exists');
            return done(null, false);
          }
          models.User.create({
            username: username,
            email: req.body.email,
            passwordVirtual: password
          })
          .then(function(user) {
            console.log('User Registration succesful');
            return done(null, user);
          })
          .catch(function(error) {
            console.log('Error in Saving user: ', error);
            throw error;
          });
        })
        .catch(function(error) {
          console.log('Error in Saving user: ', error);
          throw error;
        });
      };
      process.nextTick(findOrCreateUser);
    })
  );

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      console.log('new username:  ', username);
      console.log('new password:  ', password);
      models.User.findOne({
        where: Sequelize.or(
          {username: username},
          {email: username}
        )
      })
      .then(function(user) {
        if (!user) {
          console.log('User Not Found with username: ', username);
          req.flash('error', 'ユーザーが見つかりませんでした。');
          req.flash('input_username', username);
          req.flash('input_password', password);
          return done(null, false);
        }

        user.authenticate(password, function(err, isValid) {
          if (err) {
            console.log(err.message);
            return done(null, false);
          }
          if (!isValid) {
            console.log('Password Missmatch with username: ', username);
            req.flash('error', 'パスワードが間違っています。');
            req.flash('input_username', username);
            req.flash('input_password', password);
            return done(null, false);
          }
          console.log('Password Match with username: ', username);
          return done(null, user);
        });
      })
      .catch(function(error) {
        console.log(error.message);
        return done(null, false);
      });
    }
  ));
};
