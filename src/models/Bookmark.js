module.exports = (sequelize, DataTypes) => {
    const alias = 'Bookmark';

    const cols = {
        id_job: {
            type: DataTypes.INTEGER,
        },
        id_project: {
            type: DataTypes.INTEGER,
        },
        id_candidate: {
            type: DataTypes.INTEGER,
        },
        by_candidate: {
            type: DataTypes.INTEGER,
        },
    };

    const config = { tableName: 'bookmark' };

    const Bookmark = sequelize.define(alias, cols, config);

    // start config foreign key
    Bookmark.associate = (models) => {
        Bookmark.belongsTo(models.Job, {
            as: 'job',
            foreignKey: 'id_job',
        });

        Bookmark.belongsTo(models.Project, {
            as: 'project',
            foreignKey: 'id_project',
        });


        Bookmark.belongsTo(models.Candidate, {
            as: 'candidate',
            foreignKey: 'id_candidate',
        });

        Bookmark.belongsTo(models.Candidate, {
            as: 'candidate_by',
            foreignKey: 'by_candidate',
        });
    }
    // end config foreign key

    return Bookmark;
}