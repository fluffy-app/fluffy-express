module.exports = function(app, passport) {

  app.use('/', require('./routes/index'));
  app.use('/users', require('./routes/users'));
  app.use('/login', require('./routes/login'));
  app.use('/signup', require('./routes/signup'));
  app.use('/fluffy', require('./routes/fluffy'));

  app.get('/login', function(req, res, next) {
    res.render('login', {
      title: 'Login'
    });
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/fluffy',
    failureRedirect: '/login',
    failureFlash: true,
    session: false
  }), function(req, res, next) {
      res.send("Login success");
  });

  app.get('/signup', function(req, res, next) {
    res.render('signup', {
      title: 'Signup'
    });
  });

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/fluffy',
    failureRedirect: '/signup',
    failureFlash: true,
    session: false
  }), function(req, res, next) {
      res.send("Signup success");
  });

  app.get('/fluffy', isAuthenticated, function(req, res, next) {
    res.render('fluffy', {
      title: 'fluffy'
    });
  });

};

// As with any middleware it is quintessential to call next()
// if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
