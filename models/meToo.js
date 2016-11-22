'use strict';

module.exports = function(sequelize, DataTypes) {
  var MeToo = sequelize.define('MeToo', {
    passion: DataTypes.INTEGER,
    accepted_flag: DataTypes.BOOLEAN,
    delete_flag: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        MeToo.belongsTo(models.Thing, {
          foreignKey: 'thing_id'
        });
        MeToo.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
      }
    },
    underscored: true
  });

  return MeToo;
};
