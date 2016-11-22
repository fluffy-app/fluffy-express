'use strict';

module.exports = function(sequelize, DataTypes) {
  var PostTag = sequelize.define('PostTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        PostTag.belongsTo(models.Post, {
          foreignKey: 'post_id'
        });
        PostTag.belongsTo(models.Tag, {
          foreignKey: 'tag_id'
        });
      }
    },
    underscored: true
  });

  return PostTag;
};
