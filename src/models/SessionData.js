const Core = require('./Core');

module.exports = (sequelize, DataTypes) => {
    const alias = 'SessionData';
    const cols = {
        sid:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            primaryKey: true,
        },
        session_data:{
            type: DataTypes.TEXT
        },
        expires: {
            type: DataTypes.BIGINT,
            allowNull: false // not null
        }
    }
    const config = {
        tableName: 'sessiondatas',
        defaultScope: {
            attributes: { exclude: ['id'] } // exclude id
        }
    }
    const SessionData = Core(sequelize, DataTypes, alias, cols, config);
    return SessionData;
}