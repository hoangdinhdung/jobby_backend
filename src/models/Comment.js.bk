module.exports = (sequelize, DataTypes) => {

    const alias = 'Comment';

    const cols = {
        id_candidate: {
            type: DataTypes.INTEGER,
        },
        id_blog: {
            type: DataTypes.INTEGER,
        },
        content: {
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'comment' };

    const Comment = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return Comment;
}