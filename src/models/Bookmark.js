module.exports = (sequelize, DataTypes) => {
    const alias = 'Bookmark';

    const cols = {
        id_job:{
            type: DataTypes.INTEGER,
        },
        id_project:{
            type: DataTypes.INTEGER,
        },
        id_company:{
            type: DataTypes.INTEGER,
        },
        id_candidate: {
            type: DataTypes.INTEGER,
        },
        by_candidate: {
            type: DataTypes.INTEGER,
        },
        by_company: {
            type: DataTypes.INTEGER,
        }
    };

    const config = { tableName: 'bookmark' };

    const Bookmark = sequelize.define(alias, cols, config);
    
    // start config foreign key

    // end config foreign key

    return Bookmark;
}