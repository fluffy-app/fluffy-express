'use strict';

module.exports = function(sequelize, DataTypes) {
  var ThingTag = sequelize.define('ThingTag', {
    //
  }, {
    classMethods: {
      associate: function(models) {
        ThingTag.belongsTo(models.Thing);
        ThingTag.belongsTo(models.Tag);
      }
    },
    underscored: true
  });

  return ThingTag;
};
