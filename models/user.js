'use strict';

var bcrypt = require('bcrypt');

/**
 * パスワードからハッシュ化された値をユーザ情報にセットする
 * @param  {[type]}   user     [description]
 * @param  {[type]}   options  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
var hashPasswordHook = function(user, options, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.get('passwordVirtual'), salt, function(err, hash) {
      if (err) {
        return callback(err);
      }
      user.set('password', hash);
      return callback(null, options);
    });
  });
};

/**
 * パスワードからハッシュ化された値を取得する
 * @param  {[type]}   password [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
var hashPasswordMaker = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        return callback(err);
      }
      return callback(null, hash);
    });
  });
};

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordVirtual: DataTypes.VIRTUAL,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Thing, {
          foreignKey: 'user_id'
        });
        User.hasMany(models.Event, {
          foreignKey: 'user_id'
        });
        User.hasMany(models.Chat, {
          foreignKey: 'user_id'
        });
        User.hasMany(models.MeToo, {
          foreignKey: 'user_id'
        });
        User.hasMany(models.Favorite, {
          foreignKey: 'user_id'
        });
        User.belongsToMany(models.Tag, {
          through: models.UserTag,
          foreignKey: 'user_id',
          otherKey: 'tag_id'
        });
        User.hasMany(models.UserTag, {
          foreignKey: 'user_id'
        });
      }
    },
    hooks: {
      beforeCreate: hashPasswordHook,
      beforeUpdate: hashPasswordHook,
    },
    instanceMethods: {
      /**
       * パスワードのハッシュ化
       * @param  {[type]}   password [description]
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      makeHashPassward: function(password, callback) {
        hashPasswordMaker(password, function(err, hash) {
          return err ? callback(err) : callback(null, hash);
        });
      },
      /**
       * 引数のパスワードと登録済みパスワード(ハッシュ済)の比較を行う
       * @param  {[type]}   password [description]
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      authenticate: function(password, callback) {
        bcrypt.compare(password, this.password, function(err, isValid) {
          return err ? callback(err) : callback(null, isValid);
        });
      },
    },
    underscored: true
  });

  return User;
};
