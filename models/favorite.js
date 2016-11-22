'use strict';

module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    //
  }, {
    classMethods: {
      associate: function(models) {
        Favorite.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
        Favorite.belongsTo(models.User, {
          foreignKey: 'favorite_user_id',
          as: 'favorite_user'
        });
      }
    },
    underscored: true
  });

  return Favorite;
};
