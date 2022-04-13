module.exports = (sequelize, DataTypes) => {

    const alias = 'OpenTicket';

    const cols = {
        name:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
        },
        subject:{
            type: DataTypes.STRING,
        },
        message:{
            type: DataTypes.STRING,
        },  
    };

    const config = { tableName: 'open_ticket' };

    const OpenTicket = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return OpenTicket;
}