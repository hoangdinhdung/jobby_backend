const Core = require('./Core');

module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand';
    const cols = {
        name:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
        },
        created_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: DataTypes.NOW
        },
        deleted_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: null
        },
    }
    const config = {
        tableName: 'brands',
    }

    const Brand = Core(sequelize, DataTypes, alias, cols, config);
    return Brand;
}