require('dotenv').config(); 
const Core = require('./Core');

module.exports = (sequelize, DataTypes) => {
    const alias = 'PasswordResetToken';
    const cols = {
        email:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
        },
        token:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
        },
        created_at: {
            type: DataTypes.DATE, // type TIMESTAMP 
            allowNull: true //  null
        },
        deleted_at: {
            type: DataTypes.DATE, // type TIMESTAMP 
            allowNull: true //  null
        },
    }
    const config = {
        tableName: 'password_reset_tokens',
        defaultScope: {
            attributes: { exclude: ['id'] } // exclude id
        }
    }

    const PasswordResetToken = Core(sequelize, DataTypes, alias, cols, config);
    return PasswordResetToken;
}