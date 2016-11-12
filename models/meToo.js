'use strict';

module.exports = function(sequelize, DataTypes) {
  var MeToo = sequelize.define('MeToo', {
    passion: DataTypes.INTEGER,
    accepted_flag: DataTypes.BOOLEAN,
    delete_flag: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        MeToo.belongsTo(models.Thing);
        MeToo.belongsTo(models.User);
      }
    },
    underscored: true
  });

  return MeToo;
};
