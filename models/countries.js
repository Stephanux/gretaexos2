/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countries', {
    code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    libelle_us: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    libelle_fr: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'countries'
  });
};
