module.exports = (sequelize, DataTypes) => {
    const alias = 'Project';

    const cols = {
        name:{
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        experience_level: {
            type: DataTypes.STRING
        },
        budget: {
            type: DataTypes.STRING
        },
        salary_min: {
            type: DataTypes.BIGINT
        },
        salary_max: {
            type: DataTypes.BIGINT
        },
        location: {
            type: DataTypes.STRING
        },
        skills: {
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING
        }, 
        id_candidate: {
            type: DataTypes.INTEGER
        },
        id_company: {
            type: DataTypes.INTEGER
        }
    };

    const config = { tableName: 'project' };

    const Project = sequelize.define(alias, cols, config);

    Project.asscoiate = (models) =>{
        Project.belongsTo(models.Candidate, {
            as: 'candidate',
            foreignKey: 'id_candidate'
        })
    }
    return Project;
}