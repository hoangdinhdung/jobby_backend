module.exports = (sequelize, DataTypes) => {

    const alias = 'Data';

    const cols = {
        register_member: {
            type: DataTypes.INTEGER,
        },
        jobs_found: {
            type: DataTypes.INTEGER,
        },
        best_companies: {
            type: DataTypes.INTEGER,
        }
    }

    const config = { tableName: 'data' };

    const Data = sequelize.define(alias, cols, config);
    
    return Data;
}