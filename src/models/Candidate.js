
module.exports = (sequelize, DataTypes) =>{
    const alias = 'Candidate';

    const cols = {
        image:{
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        tagline: {
            type: DataTypes.STRING
        },
        skills: {
            type: DataTypes.STRING
        },
        availability:{
            type: DataTypes.STRING
        },
        experience_level:{
            type: DataTypes.STRING
        },
        pay_rate:{
            type: DataTypes.INTEGER
        },
        languages:{
            type: DataTypes.STRING
        },
        location:{
            type: DataTypes.STRING
        },
        company_site:{
            type: DataTypes.STRING
        },
        blog_site:{
            type: DataTypes.STRING
        },
        portfolio_site:{
            type: DataTypes.STRING
        },
        rating:{
            type: DataTypes.DOUBLE(1,2)
        },
        facebook:{
            type: DataTypes.STRING
        },
        twitter:{
            type: DataTypes.STRING
        },
        google:{
            type: DataTypes.STRING
        },
        youtube:{
            type: DataTypes.STRING
        },
        linkedin:{
            type: DataTypes.STRING
        },
        instagram:{
            type: DataTypes.STRING
        },
        dribbble:{
            type: DataTypes.STRING
        },
        behance:{
            type: DataTypes.STRING
        },
        github:{
            type: DataTypes.STRING
        }
    };

    const config = { tableName: 'candidates'};

    const Candidate = sequelize.define(alias, cols, config);

    Candidate.associate = (models) => {
        Candidate.hasMany(models.Apply, {
            as: 'apply',
            foreignKey: 'id_candidate'
        });

        Candidate.hasMany(models.Job, {
            as: 'job',
            foreignKey: 'id_candidate'
        })
    }
    return Candidate;
}