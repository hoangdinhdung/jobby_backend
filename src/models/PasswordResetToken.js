require('dotenv').config(); 
module.exports = (sequelize, DataTypes) => {
    const alias = 'PasswordResetToken';
    const cols = {
        email:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
        },
        token:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
        },
        created_at: {
            type: DataTypes.DATE, // type date
            allowNull: true //  null
        },
    }
    const config = {
        tableName: 'password_reset_tokens',
        underscored: false,
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['id'] } // exclude id
        }
    }
    const PasswordResetToken = sequelize.define(alias, cols, config);

    PasswordResetToken.getOne = async function(payload){
        const obj = {};
        if(payload.attributes && payload.attributes.length > 0){
            obj.attributes = payload.attributes;
        }
        if(payload.where){
            obj.where = payload.where;
        }
        // obj.logging = false;// false if you don't want to console log query
        obj.raw = true;
        return await PasswordResetToken.findOne(obj)
    }
    PasswordResetToken.createOne = async function(payload){
        const options = {};
        // options.logging = false; // false if you don't want to console log query
        return await PasswordResetToken.create(payload, options);
    }
    PasswordResetToken.updateMany = async function(payload, condition){
        const options = {};
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(condition){
            cond.where = condition;
        }
        return await PasswordResetToken.update(payload, cond, options);
    }
    PasswordResetToken.delete = async function(payload){
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(payload.where){
            cond.where = payload.where;
        }
        return await PasswordResetToken.destroy(cond);
    }
    PasswordResetToken.sync();// create table if not exist
    return PasswordResetToken;
}