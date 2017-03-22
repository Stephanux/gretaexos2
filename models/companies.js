/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companies', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "nextval(companies__id_seq::regclass)"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    adress1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adress2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'companies'
  });
};
