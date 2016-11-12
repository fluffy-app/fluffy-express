'use strict';

module.exports = function(sequelize, DataTypes) {
  var PostTag = sequelize.define('PostTag', {
    //
  }, {
    classMethods: {
      associate: function(models) {
        PostTag.belongsTo(models.Post);
        PostTag.belongsTo(models.Tag);
      }
    },
    underscored: true
  });

  return PostTag;
};
