'use strict';

module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define('Chat', {
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Chat.belongsTo(models.Thing, {
          foreignKey: 'thing_id'
        });
        Chat.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
      }
    },
    underscored: true
  });

  return Chat;
};
