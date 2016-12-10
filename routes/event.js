var Sequelize = require('sequelize');
var models = require('../models');
var logger  = require('../modules/logger');

module.exports = function(app) {

  app.get('/event', function(req, res, next) {
    console.log('event get');
    res.render('event', {
      title: 'Event',
      error: req.flash('error')
    });
  });

  app.post('/event', function(req, res, next) {
    process.nextTick(function() {
      if (req.user) {
        models.Event.create({
          name: req.body.name,
          detail: req.body.detail,
          schedule_date: req.body.scheduleDate,
          place: req.body.place,
          user_id: req.user.id
        })
        .then(function(event) {
          logger.app.debug('Event Registration succesful.');
          return done(null, event);
        })
        .catch(function(error) {
          logger.app.error('Error in Saving event:', error);
          return done(error);
        });
      }
    });
  });
};
