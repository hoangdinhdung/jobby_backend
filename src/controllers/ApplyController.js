// REQUIRES
const models = require('../models');

//APPLY CONTROLLER
const applyControllers = {
    // Tất cả apply
    applyFullList: async (req, res) => {
        try{
            const applyFullList = await models.Apply.findAll({

            });

            res.json({
                applyFullList: applyFullList
            })
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    },

    // Danh sách apply theo id ứng viên
    applyListWithIdCandidate: async (req, res) => {
        try{
            const result = await models.Apply.findAll({
                where: {
                    id_candidate: req.session.id
                }
            });

            res.json({
                result: result
            })
        }catch(err){
            console.log(`ERROR: ${err.message}`);
        }
    },

    // Danh sách apply theo id job
    applyListWithIdJob: async (req, res) => {
        try{
            const result = await models.Apply.findAll({
                where: {
                    id_job: req.query.job_id
                }
            });

            res.json({
                result: result
            })
        }catch(err){
            console.log(`ERROR: ${err.message}`)
        }
    },

    // Thêm mới apply job (POST)
    createApply: async (req, res) => {
        try{
            await models.Apply.create({
                full_name: req.body.full_name,
                email: req.body.email,
                //id_candidate: req.session.id, //nếu đã có xác minh đăng nhập
                id_candidate: req.body.id, 
                id_job: req.params.id,
                cv_image: req.body.cv_image
            });

            
        }catch(err){
            console.log(`ERROR: ${err.message}`)
        }
    }
}

// EXPORTS //
module.exports = applyControllers;
