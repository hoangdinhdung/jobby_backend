module.exports = (sequelize, DataTypes) => {
    const alias = 'Admin';
    const cols = {
        admin_id:{
            type: DataTypes.STRING
        },
        amdin_pwd:{
            type: DataTypes.STRING
        }
    }
    const config = {
        tableName: 'admin'
    }
    const Admin = sequelize.define(alias, cols, config);
    
    return Admin;
}