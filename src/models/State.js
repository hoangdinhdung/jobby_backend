module.exports = (sequelize, Datatypes) => {
    const alias = 'State';
    const cols = {
        name:{
            type: Datatypes.STRING
        },
        jobs:{
            type: Datatypes.INTEGER
        }
    }
    const config = {
        tableName: 'state'
    }
    const State = sequelize.define(alias, cols, config);
    return State;
}