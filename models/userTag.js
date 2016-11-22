'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserTag = sequelize.define('UserTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        UserTag.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
        UserTag.belongsTo(models.Tag, {
          foreignKey: 'tag_id'
        });
      }
    },
    underscored: true
  });

  return UserTag;
};
