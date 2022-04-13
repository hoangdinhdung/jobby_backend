module.exports = (sequelize, DataTypes) => {

    const alias = 'Statement';

    const cols = {
        pricing_name: {
            type: DataTypes.STRING,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
        },
        type: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
    };

    const config = { tableName: 'statement' };

    const Statement = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return Statement;
}