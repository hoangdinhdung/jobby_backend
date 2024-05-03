module.exports = (sequelize, DataTypes) => {
    
    const alias = 'PricingPlan';

    const cols = {
        type:{
            type: DataTypes.STRING,
        },
        image:{
            type: DataTypes.STRING,
        },
        name:{
            type: DataTypes.STRING,
        },
        price:{
            type: DataTypes.INTEGER,
        },
        listing:{
            type: DataTypes.INTEGER,
        },
        visibility:{
            type: DataTypes.INTEGER,
        },
        description:{
            type: DataTypes.STRING,    
        },
    };

    const config = { tableName: 'pricing_plan' };

    const PricingPlan = sequelize.define(alias, cols, config);
    // start config foreign key

    // end config foreign key

    return PricingPlan;
}