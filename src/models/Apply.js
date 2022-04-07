
module.exports = (sequelize, DataTypes) => {
    const alias = 'Apply';

    const cols = {
        full_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        cv_image: {
            type: DataTypes.STRING
        },
        id_candidate: {
            type: DataTypes.INTEGER
        },
        id_job: {
            type: DataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'apply'
    };

    const Apply = sequelize.define(alias, cols, config);

    Apply.associate = (models) => {
        Apply.belongsTo(models.Candidate, {
            as: 'candidate',
            foreignKey: 'id_candidate'
        });

        Apply.belongsTo(models.Job, {
            as: 'job',
            foreignKey: 'id_job'
        })
    }
    return Apply;
}