module.exports = (sequelize, DataTypes) => {

    const alias = 'Contact';

    const cols = {
        id_candidate: {
            type: DataTypes.INTEGER,
        },
        id_company: {
            type: DataTypes.INTEGER,
        },
        type:{
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'contact' };

    const Contact = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return Contact;
}