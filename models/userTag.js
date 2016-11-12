'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserTag = sequelize.define('UserTag', {
    //
  }, {
    classMethods: {
      associate: function(models) {
        UserTag.belongsTo(models.User);
        UserTag.belongsTo(models.Tag);
      }
    },
    underscored: true
  });

  return UserTag;
};
