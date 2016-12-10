var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var models = require('../models');
var logger  = require('../modules/logger');

router.get('/metoo', function(req, res, next) {
  if (req.user) {
    models.Thing.findAll({
      include: [{
        model: models.MeToo,
        where: {
           user_id: req.user.id
        },
        required: false
      }]
    })
    .then(function(things) {
      logger.app.debug('things:', things);
      res.render('metoo', {
        title: 'MeToo',
        things: things,
        error: req.flash('error')
      });
    })
    .catch(function(error) {
      logger.app.error('Error in Find thing:', error);
      res.render('metoo', {
        title: 'MeToo',
        things: [],
        error: req.flash('error', 'Error in Find thing')
      });
    });
  }
});

router.post('/metoo', function(req, res, next) {
  process.nextTick(function() {
    if (req.user) {
      models.MeToo.create({
        thing_id: req.body.thingId,
        user_id: req.user.id,
        passion: req.body.passion
      })
      .then(function(meToo) {
        logger.app.debug('MeToo Registration succesful.');
        models.Thing.findAll({
          include: [{
            model: models.MeToo,
            where: {
               user_id: req.user.id
            },
            required: false
          }]
        })
        .then(function(things) {
          logger.app.debug('things:', things);
          res.render('metoo', {
            title: 'MeToo',
            things: things,
            error: req.flash('error')
          });
        });
      })
      .catch(function(error) {
        logger.app.error('Error in Saving metoo:', error);
        res.render('metoo', {
          title: 'MeToo',
          things: [],
          error: req.flash('error', 'Error in Saving metoo')
        });
      });
    }
  });
});

module.exports = router;
