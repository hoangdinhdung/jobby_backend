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
            unique: true,
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

    // // Hook beforeCreate - validate
    // User.beforeCreate((admin, options) => {
    //     if (!admin.name || admin.name.length == 0) {
    //         throw new Error('Độ dài của trường "name" không được để trống.');
    //     }
    //     if (admin.name.length > 255) {
    //         throw new Error('Độ dài của trường "name" không thể lớn hơn 255 kí tự.');
    //     }
    //     if (!admin.password || admin.password.length == 0) {
    //         throw new Error('Độ dài của trường "password" không được để trống.');
    //     }
    //     if (admin.password.length > 255) {
    //         throw new Error('Độ dài của trường "password" không thể lớn hơn 255 kí tự.');
    //     }
    // });
    
    // // Hook beforeUpdate - validate
    // User.beforeUpdate((admin, options) => {
    //     // if field name has changed
    //     if (admin.changed('name')) {
    //         const newName = admin.getDataValue('name'); // get new value
    //         if (!newName || newName.length == 0) {
    //             throw new Error('Độ dài của trường "name" không được để trống.');
    //         }
    //         if (newName.length > 255) {
    //             throw new Error('Độ dài của trường "name" không thể lớn hơn 255 kí tự.');
    //         }
    //     }
    //     // if field password has changed
    //     if (admin.changed('password')) {
    //         const newPass = admin.getDataValue('password'); // get new value
    //         if (!newPass || newPass.length == 0) {
    //             throw new Error('Độ dài của trường "password" không được để trống.');
    //         }
    //         if (newPass.length > 255) {
    //             throw new Error('Độ dài của trường "password" không thể lớn hơn 255 kí tự.');
    //         }
    //     }
    // });

    // get all user
    User.getAllUser = async function(payload) {
        const obj = {};
        if(payload.attributes && payload.attributes.length > 0){
            obj.attributes = payload.attributes;
        }
        if(payload.where){
            obj.where = payload.where;
        }
        // obj.logging = false;// console log query
        return await User.findAll(obj)
    };
    // User.sync({ alter: true })
    return User;
}