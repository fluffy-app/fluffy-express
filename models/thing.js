'use strict';

module.exports = function(sequelize, DataTypes) {
  var Thing = sequelize.define('Thing', {
    title: DataTypes.STRING,
    passion: DataTypes.INTEGER,
    schedule_date: DataTypes.DATE,
    delete_flag: DataTypes.BOOLEAN,
    image_path: DataTypes.STRING,
    close_flag: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Thing.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
        Thing.hasMany(models.Event, {
          foreignKey: 'thing_id'
        });
        Thing.hasMany(models.Chat, {
          foreignKey: 'thing_id'
        });
        Thing.hasMany(models.Post, {
          foreignKey: 'thing_id'
        });
        Thing.hasMany(models.MeToo, {
          foreignKey: 'thing_id'
        });
        Thing.belongsToMany(models.Tag, {
          through: models.ThingTag,
          foreignKey: 'thing_id',
          otherKey: 'tag_id'
        });
        Thing.hasMany(models.ThingTag, {
          foreignKey: 'thing_id'
        });
      }
    },
    underscored: true
  });

  return Thing;
};
