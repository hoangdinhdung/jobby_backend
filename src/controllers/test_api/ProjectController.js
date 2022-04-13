// REQUIRES //
const models =  require('../../models');
const { Op } = require("sequelize");

// PROJECT CONTROLLERS //
const projectController = {
    // Hiển thị tất cả project
    projectFullList : async (req, res) => {
        try{
            const projectFullList = await models.Project.findAll({
                logging: false,
            });

            res.json({
                projectFullList: projectFullList
            })
        }catch{
            console.log(`ERROR: ${err}`);
        }
    },

    // Hiển thị danh sách project theo page
    projectPage: async (req, res) => {
        try{
            const projectPage = await models.Project.findAll({
                logging: false,
                limit: 6,
                offset: 6 * (req.query.page)
            })

            res.json({
                projectPage: projectPage
            })
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    },

    //Tìm kiếm project
    findProject: async(req, res) => {
        try{
            if(req.body.skills != null){
                const listSkill = req.body.skills.split(',');
                const projectFound = await models.Project.findAll({
                    where:{
                        [Op.or]:{
                            skills:{
                                [Op.in]: listSkill
                            },
                            budget:{
                                [Op.eq]: req.body.avalability 
                            },
                            category: {
                                [Op.eq]: req.body.job_type
                            },
                            salary_min:{
                                [Op.and]: {
                                    [Op.gte]: req.body.pay_rate_min,
                                    [Op.lte]: req.body.pay_rate_max
                                }
                            },
                            salary_max: {
                                [Op.and]: {
                                    [Op.gte]: req.body.pay_rate_min,
                                    [Op.lte]: req.body.pay_rate_max
                                }
                            },
                            experience_level: {
                                [Op.eq]: req.body.experience_level
                            },
                            location: {
                                [Op.eq]: req.body.location
                            }
                        }
                    },
                    logging: false
                })

                res.json({
                    projectFound: projectFound
                })
            }else{
                const projectFound = await models.Project.findAll({
                    where:{
                        [Op.or]:{
                            budget:{
                                [Op.eq]: req.body.avalability 
                            },
                            category: {
                                [Op.eq]: req.body.job_type
                            },
                            salary_min:{
                                [Op.and]: {
                                    [Op.gte]: req.body.pay_rate_min,
                                    [Op.lte]: req.body.pay_rate_max
                                }
                            },
                            salary_max: {
                                [Op.and]: {
                                    [Op.gte]: req.body.pay_rate_min,
                                    [Op.lte]: req.body.pay_rate_max
                                }
                            },
                            experience_level: {
                                [Op.eq]: req.body.experience_level
                            },
                            location: {
                                [Op.eq]: req.body.location
                            }
                        }
                    },
                    logging: false
                })

                res.json({
                    projectFound: projectFound
                })
            }
            
            
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }
}

// EXPORTS //
module.exports = projectController;