'use strict';

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    comment: DataTypes.TEXT,
    image_path: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.Thing);
        Post.belongsToMany(models.Tag, {
          through: models.PostTag
        });
        Post.hasMany(models.PostTag);
      }
    },
    underscored: true
  });

  return Post;
};
