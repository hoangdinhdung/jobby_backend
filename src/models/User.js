module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        name:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            // validate: {
            //     len: [1, 255]
            // }
        },
        phone_number:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            // validate: {
            //     len: [1, 255]
            // }
        },
        email:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            // unique: true,
            validate: {
                len: [1, 255]
            }
        },
        email_verified_at: {
            type: DataTypes.DATE, // type date
            allowNull: true, //  null
            defaultValue: DataTypes.NOW
        },
        password:{
            type: DataTypes.STRING(255), // max length 255
            allowNull: false, // not null
            validate: {
                len: [1, 255]
            }
        },
        isAdmin: {
            type: DataTypes.TINYINT, // type tinyint
            allowNull: false, // not null
            defaultValue: 0
        },
        remember_token:{
            type: DataTypes.STRING(100), // max length 100
            allowNull: true, // null
            validate: {
                len: [1, 100]
            }
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
            defaultValue: DataTypes.NOW
        },
    }
    const config = {
        tableName: 'users',
    }
    const User = sequelize.define(alias, cols, config);

    // get all user
    User.getAllUser = async function(payload) {
        try {
            const obj = {};
            if(payload.attributes && payload.attributes.length > 0){
                obj.attributes = payload.attributes;
            }
            if(payload.where){
                obj.where = payload.where;
            }
            // obj.logging = false;// console log query
            return await User.findAll(obj)
        } catch (error) {
            
        }
    };

    User.getList = async function(payload) {
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
        return await User.findAndCountAll(obj)
    };

    User.updateMany = async function(payload, condition){
        const options = {};
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(condition){
            cond.where = condition;
        }
        return await User.update(payload, cond, options);
    }

    User.delete = async function(payload){
        const cond = {};
        // cond.logging = false; // false if you don't want to console log query
        if(payload.where){
            cond.where = payload.where;
        }
        return await User.destroy(cond);
    }
    // User.sync({ alter: true })
    return User;
}