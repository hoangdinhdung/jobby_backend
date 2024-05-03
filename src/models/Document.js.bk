module.exports = (sequelize, DataTypes) => {

    const alias = 'Document';

    const cols = {
        type:{
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'document'};

    const Document = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return Document;
}