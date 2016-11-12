'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    //
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Thing);
        User.hasMany(models.Event);
        User.hasMany(models.Chat);
        User.hasMany(models.MeToo);
        User.hasMany(models.Favorite);
        User.belongsToMany(models.Tag, {
          through: models.UserTag
        });
        User.hasMany(models.UserTag);
      }
    },
    underscored: true
  });

  return User;
};
