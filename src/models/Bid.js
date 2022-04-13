module.exports = (sequelize, DataTypes) => {
    const alias = 'Bid';
    
    const cols = {
        min_rate:{
            type: DataTypes.INTEGER,
        },
        delivery_time: {
            type: DataTypes.DATEONLY,
        },
        id_project: {
            type: DataTypes.INTEGER,
        },
        id_candidate: {
            type: DataTypes.INTEGER,
        },
        id_company: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'bid' };

    const Bid = sequelize.define(alias, cols, config);

    // start config foreign key

    // end config foreign key

    return Bid;
}