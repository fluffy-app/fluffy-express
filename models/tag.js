'use strict';

module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(models.User, {
          through: models.UserTag
        });
        Tag.hasMany(models.UserTag);
        Tag.belongsToMany(models.Thing, {
          through: models.ThingTag,
        });
        Tag.hasMany(models.ThingTag);
        Tag.belongsToMany(models.Post, {
          through: models.PostTag
        });
        Tag.hasMany(models.PostTag);
      }
    },
    underscored: true
  });

  return Tag;
};
