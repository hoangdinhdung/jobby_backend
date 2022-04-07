// requires 
const models = require('../models');



const adminController = {
    adminFullList: async (req, res) =>{
        try{
            const admins = await models.Admin.findAll({
                attributes: ['admin_id', 'admin_pwd']
            })
            return res.json({
                data: {
                    admins
                }
            });
        }catch(error){
            console.log(`ERROR: ${error}`);
        }
    }
}

module.exports = adminController;