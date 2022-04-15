 module.exports = (sequelize, DataTypes) => {
    
    const alias = 'Company';

    const cols = {
        image:{
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        tagline: {
            type: DataTypes.STRING,
        },
        skills: {
            type: DataTypes.STRING,
        },
        availability: {
            type: DataTypes.STRING,
        },
        experience_level: {
            type: DataTypes.STRING,
        },
        pay_rate: {
            type: DataTypes.INTEGER,
        },
        languages: {
            type: DataTypes.STRING,
        },
        id_location: {
            type: DataTypes.INTEGER,
        },
        rating:{
            type: DataTypes.DOUBLE(2, 1),
        },
        status: {
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'company' };

    const Company = sequelize.define(alias, cols, config);
    // start config foreign key
    Company.associate = (models) => {
        Company.hasMany(models.Job, {
            as: 'job',
            foreignKey: 'id_company',
        });

        Company.hasMany(models.Bookmark, {
            as: 'bookmark',
            foreignKey: 'id_company',
        });

        Company.hasMany(models.Bookmark, {
            as: 'bookmark_by',
            foreignKey: 'id_company',
        })
    }
    // end config foreign key
    
    return Company;
 }