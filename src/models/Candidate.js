
module.exports = (sequelize, DataTypes) =>{
    const alias = 'Candidate';

    const cols = {
        image:{
            type: DataTypes.STRING,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password:{
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
        availability:{
            type: DataTypes.STRING,
        },
        experience_level:{
            type: DataTypes.STRING,
        },
        pay_rate:{
            type: DataTypes.INTEGER,
        },
        languages:{
            type: DataTypes.STRING,
        },
        id_location:{
            type: DataTypes.STRING,
        },
        rating:{
            type: DataTypes.DOUBLE(1,2),
        },
        status:{
            type: DataTypes.STRING,
        }
    };

    const config = { tableName: 'candidate'};

    const Candidate = sequelize.define(alias, cols, config);
    // start config foreign key

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

    // end config foreign key

    return Candidate;
}