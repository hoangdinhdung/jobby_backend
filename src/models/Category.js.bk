
module.exports = (sequelize, DataTypes) =>{
    const alias = 'Category';
    const cols = {
        name: {
            type: DataTypes.STRING,
        },
        jobs: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        },
    }
    const config = {
        tableName: 'category'
    }

    const Category = sequelize.define(alias, cols, config);
    return Category;
}