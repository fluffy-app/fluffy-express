var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

  models.User.findAll({
    // 条件
  })
  .then(function(users) {
    //参照成功時の処理
    users.forEach(function(user) {
      console.log("id: ", user.id);
      console.log("created_at: ", user.created_at);
      console.log("updated_at: ", user.updated_at);
    });
  })
  .catch(function(err) {
    //参照エラー時の処理
    console.log(err);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
