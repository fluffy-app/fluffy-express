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
        Thing.belongsTo(models.User);
        Thing.hasMany(models.Event);
        Thing.hasMany(models.Chat);
        Thing.hasMany(models.Post);
        Thing.hasMany(models.MeToo);
        Thing.belongsToMany(models.Tag, {
          through: models.ThingTag
        });
        Thing.hasMany(models.ThingTag);
      }
    },
    underscored: true
  });

  return Thing;
};
