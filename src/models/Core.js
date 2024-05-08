// Core.js
module.exports = (sequelize, DataTypes, alias, cols, config) => {
    const Core = sequelize.define(alias, cols, config);

    // Core methods if any
    // get all user
    Core.getAllUser = async function(payload) {
        try {
            const obj = {};
            if(payload.attributes && payload.attributes.length > 0){
                obj.attributes = payload.attributes;
            }
            if(payload.where){
                obj.where = payload.where;
            }
            // obj.logging = false;// console log query
            return await Core.findAll(obj)
        } catch (error) {
            
        }
    };

    // get all
    Core.getAll = async function(payload) {
        try {
            const obj = {};
            if(payload.attributes && payload.attributes.length > 0){
                obj.attributes = payload.attributes;
            }
            if(payload.where){
                obj.where = payload.where;
            }
            // obj.logging = false;// console log query
            return await Core.findAll(obj)
        } catch (error) {
            
        }
    };
    
    Core.getList = async function(payload) {
        const obj = {};
        if(payload.attributes && payload.attributes.length > 0){
            obj.attributes = payload.attributes;
        }
        if(payload.where){
            obj.where = payload.where;
        }
        if(payload.offset){
            obj.offset = payload.offset;
        }
        if(payload.limit){
            obj.limit = payload.limit;
        }
        // obj.logging = false;// console log query
        return await Core.findAndCountAll(obj)
    };

    Core.updateMany = async function(payload, condition){
        const options = {};
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(condition){
            cond.where = condition;
        }
        return await Core.update(payload, cond, options);
    }

    Core.delete = async function(payload){
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(payload.where){
            cond.where = payload.where;
        }
        return await Core.destroy(cond);
    }

    return Core;
};
