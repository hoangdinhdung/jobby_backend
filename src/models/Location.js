module.exports = (sequelize, DataTypes) => {

    const alias = 'Location';

    const cols = {
        src:{
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        }
    }

    const config = { tableName: 'location' };

    const Location = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return Location;
}