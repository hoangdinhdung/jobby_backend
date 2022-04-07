module.exports = (sequelize, DataTypes) => {
    const alias = "Job";
    const cols = {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        availability: {
            type: DataTypes.STRING
        }, 
        experience_level: {
            type: DataTypes.STRING
        },
        salary_min: {
            type: DataTypes.BIGINT(20)
        },
        salary_max: {
            type: DataTypes.BIGINT(20),
            defaultValue: 5000
        },
        location: {
            type: DataTypes.STRING
        },
        languages: {
            type: DataTypes.STRING
        },
        skills: {
            type: DataTypes.STRING
        },
        views: {
            type: DataTypes.INTEGER
        },
        id_candidate: {
            type: DataTypes.INTEGER
        },
        id_company: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        expired_at: {
            type: DataTypes.DATEONLY
        }
    }
    const config = {
        tableName: 'job'
    }

    const Job = sequelize.define(alias, cols, config);

    Job.associate = (models) => {
        Job.hasMany(models.Apply, {
            as: 'apply',
            foreignKey: 'id_job'
        })

        Job.belongsTo(models.Candidate, {
            as: 'candidate',
            foreignKey: 'id_candidate'
        })
    }
    return Job;
}