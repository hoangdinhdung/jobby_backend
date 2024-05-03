module.exports = (sequelize, DataTypes) => {
    const alias = 'Blog';

    const cols = {
        image: {
            type: DataTypes.STRING,
        },
        id_candidate: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
        },
        description1: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
        description2: {
            type: DataTypes.STRING,
        },
    };

    const config = { tableName: 'blog' };

    const Blog = sequelize.define(alias, cols, config);

    // start config foreign key

    // end config foreign key

    return Blog;
}