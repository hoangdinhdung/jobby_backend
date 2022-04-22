module.exports = (sequelize, DataTypes) =>{
    const alias = 'RefreshToken';

    const cols = {
        token: {
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'refresh_token' };

    const RefreshToken = sequelize.define(alias, cols, config);

    return RefreshToken;
}