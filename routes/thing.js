var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var models = require('../models');
var logger  = require('../modules/logger');

router.get('/thing', function(req, res, next) {
  process.nextTick(function() {
    if (req.user) {
      models.Thing.findAll({
        where: {
          user_id: req.user.id
        },
        include: [{
          model: models.Tag,
          include: [models.ThingTag],
          required: false
        }]
      })
      .then(function(things) {
        res.render('thing', {
          title: 'Thing',
          things: things,
          error: req.flash('error')
        });
      })
      .catch(function(error) {
        logger.app.error('Error in Find thing:', error);
        res.render('thing', {
          title: 'Thing',
          things: [],
          error: req.flash('error', 'Error in Find thing')
        });
      });
    }
  });
});

router.post('/thing', function(req, res, next) {
  process.nextTick(function() {
    if (req.user) {
      models.Thing.create({
        title: req.body.title,
        passion: req.body.passion,
        schedule_date: req.body.scheduleDate,
        user_id: req.user.id,
        Tags: {
          name: req.body.tagName
        }
      }, {
        include: [models.Tag]
      })
      .then(function(thing) {
        logger.app.debug('Thing Registration succesful.');
        models.Thing.findAll({
          where: {
            user_id: req.user.id
          },
          include: [{
            model: models.Tag,
            include: [models.ThingTag],
            required: false
          }]
        })
        .then(function(things) {
          res.render('thing', {
            title: 'Thing',
            things: things,
            error: req.flash('error')
          });
        });
      })
      .catch(function(error) {
        logger.app.error('Error in Saving thing:', error);
        res.render('thing', {
          title: 'Thing',
          things: [],
          error: req.flash('error', 'Error in Saving thing')
        });
      });
    }
  });
});

module.exports = router;
