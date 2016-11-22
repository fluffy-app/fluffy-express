'use strict';

module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(models.User, {
          through: models.UserTag,
          foreignKey: 'tag_id',
          otherKey: 'user_id'
        });
        Tag.hasMany(models.UserTag, {
          foreignKey: 'tag_id'
        });
        Tag.belongsToMany(models.Thing, {
          through: models.ThingTag,
          foreignKey: 'tag_id',
          otherKey: 'thing_id'
        });
        Tag.hasMany(models.ThingTag, {
          foreignKey: 'tag_id'
        });
        Tag.belongsToMany(models.Post, {
          through: models.PostTag,
          foreignKey: 'tag_id',
          otherKey: 'post_id'
        });
        Tag.hasMany(models.PostTag, {
          foreignKey: 'tag_id'
        });
      }
    },
    underscored: true
  });

  return Tag;
};
