const models = require('../models');

const categoryController = {
    categoryFullList: async(req, res) => {
        try{
            const categoryFullList = await models.Category.findAll();

            res.json({
                categoryFullList: categoryFullList
            })
        }catch(error){
            console.log(`ERROR: ${error}`);
        }
        


    }
}

// EXPORTS
module.exports = categoryController;