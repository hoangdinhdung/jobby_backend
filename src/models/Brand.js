module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand';
    const cols = {
        name:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
        },
        created_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: DataTypes.NOW
        },
        deleted_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: null
        },
    }
    const config = {
        tableName: 'brands',
    }
    const Brand = sequelize.define(alias, cols, config);

    // get all
    Brand.getAll = async function(payload) {
        try {
            const obj = {};
            if(payload.attributes && payload.attributes.length > 0){
                obj.attributes = payload.attributes;
            }
            if(payload.where){
                obj.where = payload.where;
            }
            // obj.logging = false;// console log query
            return await Brand.findAll(obj)
        } catch (error) {
            
        }
    };

    Brand.getList = async function(payload) {
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
        return await Brand.findAndCountAll(obj)
    };

    Brand.updateMany = async function(payload, condition){
        const options = {};
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(condition){
            cond.where = condition;
        }
        return await Brand.update(payload, cond, options);
    }

    Brand.delete = async function(payload){
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(payload.where){
            cond.where = payload.where;
        }
        return await Brand.destroy(cond);
    }
    // Brand.sync({ alter: true })
    return Brand;
}