module.exports = function(app, passport) {

  app.use('/', require('./routes/index'));
  app.use('/login', require('./routes/login'));
  app.use('/signup', require('./routes/signup'));
  app.use('/fluffy', require('./routes/fluffy'));

  app.get('/login', function(req, res, next) {
    res.render('login', {
      title: 'Login',
      error: req.flash('error')
    });
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/fluffy',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
  }), function(req, res, next) {
      res.send("Login success");
  });

  app.get('/signup', function(req, res, next) {
    res.render('signup', {
      title: 'Signup',
      error: req.flash('error')
    });
  });

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/fluffy',
    failureRedirect: '/signup',
    failureFlash: true,
    session: true
  }), function(req, res, next) {
      res.send("Signup success");
  });

  // ログイン済でないと遷移できない
  app.get('/fluffy', isAuthenticated, function(req, res, next) {
    res.render('fluffy', {
      title: 'fluffy'
    });
  });

};

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
