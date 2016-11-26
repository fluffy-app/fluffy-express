var express = require('express');
var router = express.Router();

var logger  = require('../modules/logger');
var models  = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {

  // ログテスト
  logger.app.fatal('FATAL');
  logger.app.error('ERROR');
  logger.app.warn('WARN');
  logger.app.info('INFO');
  logger.app.debug('DEBUG');
  logger.app.trace('TRACE');

  res.render('index', { title: 'Express' });
});

module.exports = router;
