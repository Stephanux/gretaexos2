/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Countries', {
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
    }, {
        classMethods: {
            associate: function(models) {
                GLOBAL.db.Countries.hasOne(GLOBAL.db.Companies, {
                    foreignKey: 'fk_countrieId'
                })
            }
        }
    });
    return Countries;
};
