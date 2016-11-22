'use strict';

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    detail: DataTypes.TEXT,
    schedule_date: DataTypes.DATE,
    place: DataTypes.STRING,
    delete_flag: DataTypes.BOOLEAN,
    close_flag: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.Thing, {
          foreignKey: 'thing_id'
        });
        Event.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
      }
    },
    underscored: true
  });

  return Event;
};
