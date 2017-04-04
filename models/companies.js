/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Companies = sequelize.define('companies', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        /*,
                countrieId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'countries',
                        key: 'id'
                    }
                }*/
    }, {
        tableName: 'companies'
    });
    return Companies;
};
