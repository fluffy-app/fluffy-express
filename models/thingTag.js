'use strict';

module.exports = function(sequelize, DataTypes) {
  var ThingTag = sequelize.define('ThingTag', {
    //
  }, {
    classMethods: {
      associate: function(models) {
        ThingTag.belongsTo(models.Thing, {
          foreignKey: 'thing_id'
        });
        ThingTag.belongsTo(models.Tag, {
          foreignKey: 'tag_id'
        });
      }
    },
    underscored: true
  });

  return ThingTag;
};
