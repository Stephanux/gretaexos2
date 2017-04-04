/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Countries = sequelize.define('countries', {
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
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: 'countries'
    });

    return Countries;
};
