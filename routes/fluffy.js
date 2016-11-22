var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('fluffy');
  res.render('fluffy', {
    title: 'Fluffy'
  });
});

module.exports = router;
