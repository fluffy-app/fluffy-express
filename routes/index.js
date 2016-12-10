var express = require('express');
var router = express.Router();

var logger  = require('../modules/logger');
var models  = require('../models');

router.get('/', function(req, res, next) {

  // ログテスト
  logger.app.fatal('FATAL');
  logger.app.error('ERROR');
  logger.app.warn('WARN');
  logger.app.info('INFO');
  logger.app.debug('DEBUG');
  logger.app.trace('TRACE');

  models.User.findOne({
    where: {
      username: {
        $like: 'user15'
        // $like: 'user-not-found'
      }
    }
  })
  .then(function(user15) {
    logger.app.debug('user15:', user15);
    if (user15) {
      return models.User.findOne({
        where: {
          username: {
            $like: 'user14'
            // $like: 'user-not-found'
          }
        }
      });
    }
    throw new Error('user15 not-found');
  })
  .then(function(user14) {
    logger.app.debug('user14:', user14);
    if (user14) {
      return models.User.findOne({
        where: {
          username: {
            // $like: 'user13'
            $like: 'user-not-found'
          }
        }
      });
    }
    throw new Error('user14 not-found');
  })
  .then(function(user13){
    logger.app.debug('user13:', user13);
    if (user13) {
      res.render('index', { title: 'Express ALL OK' });
    }
    throw new Error('user13 not-found');
  })
  .catch(function(error) {
    logger.app.debug('Error:', error);
    res.render('index', { title: 'Express has ' + error.message});
  });
});

module.exports = router;
