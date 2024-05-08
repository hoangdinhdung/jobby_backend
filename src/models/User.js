const Core = require('./Core');

module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        name:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            // validate: {
            //     len: [1, 255]
            // }
        },
        phone_number:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            // validate: {
            //     len: [1, 255]
            // }
        },
        email:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            // unique: true,
            validate: {
                len: [1, 255]
            }
        },
        email_verified_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: DataTypes.NOW
        },
        password:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            validate: {
                len: [1, 255]
            }
        },
        isAdmin: {
            type: DataTypes.TINYINT, // type tinyint
            allowNull: false, // not null
            defaultValue: 0
        },
        remember_token:{
            type: DataTypes.STRING(100), // max length 100
            allowNull: true, // null
            validate: {
                len: [1, 100]
            }
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
        tableName: 'users',
    }
    const User = Core(sequelize, DataTypes, alias, cols, config);
    return User;
}