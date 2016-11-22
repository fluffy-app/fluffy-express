'use strict';

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    comment: DataTypes.TEXT,
    image_path: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.Thing, {
          foreignKey: 'thing_id'
        });
        Post.belongsToMany(models.Tag, {
          through: models.PostTag,
          foreignKey: 'post_id',
          otherKey: 'tag_id'
        });
        Post.hasMany(models.PostTag, {
          foreignKey: 'post_id'
        });
      }
    },
    underscored: true
  });

  return Post;
};
