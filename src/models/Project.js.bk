module.exports = (sequelize, DataTypes) => {
    const alias = 'Project';

    const cols = {
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
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
        hourly: {
            type: DataTypes.INTEGER,
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
        image: {
            type: DataTypes.STRING
        },
        id_candidate: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING,
        },
        expired_at: {
            type: DataTypes.DATEONLY,
        }
    };

    const config = { tableName: 'project' };

    const Project = sequelize.define(alias, cols, config);

    // start config foreign key


    Project.asscoiate = (models) => {
        Project.belongsTo(models.Candidate, {
            as: 'candidate',
            foreignKey: 'id_candidate',
        });

        Project.hasMany(models.Bookmark, {
            as: 'bookmark',
            foreignKey: 'id_project',
        })
    }

    // end config foreign key

    return Project;
}