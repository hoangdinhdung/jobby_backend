module.exports = (sequelize, DataTypes) => {

    const alias = 'Invoice';

    const cols = {
        customer:{
            type: DataTypes.STRING,
        },
        supplier:{
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'invoice'};

    const Invoice = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return Invoice;
}