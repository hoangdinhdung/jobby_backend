module.exports = (sequelize, DataTypes) => {
    const alias = 'State';
    const cols = {
        image: {
            type: DataTypes.STRING,
        },
        name:{
            type: DataTypes.STRING
        },
        jobs:{
            type: DataTypes.INTEGER
        }
    }
    const config = {
        tableName: 'state'
    }
    const State = sequelize.define(alias, cols, config);
    return State;
}