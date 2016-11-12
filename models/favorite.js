'use strict';

module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    //
  }, {
    classMethods: {
      associate: function(models) {
        Favorite.belongsTo(models.User);
        Favorite.belongsTo(models.User, {
          as: 'favorite_user'
        });
      }
    },
    underscored: true
  });

  return Favorite;
};
