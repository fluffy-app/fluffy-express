'use strict';

module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define('Chat', {
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Chat.belongsTo(models.Thing);
        Chat.belongsTo(models.User);
      }
    },
    underscored: true
  });

  return Chat;
};
