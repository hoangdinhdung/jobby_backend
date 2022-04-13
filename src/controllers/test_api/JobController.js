// REQUIRES
const models = require('../../models');
const { Op } = require("sequelize");

// JOB CONTROLLER
const jobController = {
    JobFullList: async(req, res) =>{
        const jobList = await models.Job.findAll({
            logging: false,
            //attributes: ['expired_at']
            //include: ['candidate']
        });
        res.json({
            jobList: jobList
        })
    },

    // Hiển thị job mới nhất (Home Page)
    findLatestJobs: async(req, res) =>{
        try{
            const latestJobs = await models.Job.findAll({
                include: [{
                    all: true,
                    nested: true
                }],
                order: [
                    ['created_at', 'DESC']    
                ],
                limit: 6,
                logging: false
            });
            res.json({
                latestJobs: latestJobs
            });
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    },

    // Hiển thị job mới nhất (Browse Job)
    latestBrowseJob: async (req, res) => {
        try{
            const latestBrowseJobs = await models.Job.findAll({
                include: [{
                    all: true,
                    nested: true
                }],
                order: [
                    ['created_at', 'DESC']    
                ],
                limit: 6,
                offset: 6 * (req.query.page - 1), 
                logging: false
            });
            res.json({
                latestBrowseJobs: latestBrowseJobs
            });
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    },

    // Hiển thị job Full Time
    fullTimeJobs: async(req, res) =>{
        try{
            const fullTimeJobs = await models.Job.findAll({
                where:{
                    availability:{
                        [Op.eq]: 'Full Time'
                    }
                },
                limit: 6,
                offset: 6 * (req.query.page - 1),
                logging: false
            });

            res.json({
                fullTimeJobs: fullTimeJobs
            })
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    },

    // Hiển thị Job Part Time
    partTimeJobs: async(req, res) =>{
        try{
            const partTimejobs = await models.Job.findAll({
                where:{
                    availability:{
                        [Op.eq]: 'Part Time'
                    }
                },
                limit: 6,
                offset: 6 * (req.query.page - 1),
                logging: false
            });

            res.json({
                partTimejobs: partTimejobs
            })
        }catch(err){
            console.error(`ERROR: ${err}`);
        }
    },

    // Tìm kiếm job
    findJobs: async(req, res) =>{
        try{
            const listSkills = req.body.skills.split(',');
            const result = await models.Job.findAll({
                where: {
                    [Op.or]: [
                        {
                            skills: {
                                [Op.in]: listSkills
                            }
                        },
                        {
                            availability:{
                                [Op.eq]: req.body.availability
                            }
                        },
                        {
                            type:{
                                [Op.eq]: req.body.job_type
                            }
                        },
                        {
                            salary_min:{
                                [Op.between]: [0, req.body.pay_rate_max]
                            }
                        },
                        {
                            experience_level: {
                                [Op.eq]: req.body.experience_level
                            }
                        },
                        {
                            location:{
                                [Op.eq]: req.body.location
                            }
                        }
                        
                    ]
                },
                logging: false
            });

            if(result){
                res.json({
                    success: result
                })
            }

        }catch(err){
            console.error(`ERROR: ${err}`);
        }
    },

    // Hiển thị chi tiết job
    jobDetails: async (req, res) => {
        try{
            const job = await models.Job.findAll({
                where:{
                    id: req.params.id
                },
                 logging: false
            })


            res.json({
                jobDetails: job
            })
        }catch(err){
            console.error(`ERROR: ${err}`);
        }
    },

    jobUpdate: async (req, res)=>{
        try{
            var expired_at_list = await models.Job.findAll({
                attributes: ['id','expired_at'],
                logging: false
            });

            console.log(expired_at_list[0])
            for(let i=0; i<expired_at_list.length;i++){
                const now = new Date();
                const expire = new Date(expired_at_list[i].expired_at);
                if(now.getTime() - expire.getTime() > 0){
                    // const job = await models.Job.findByPk(expired_at_list[i].id,{

                    // })
                    await models.Job.update({
                        status: 'Expiring'
                    },{
                        where:{
                            id: expired_at_list[i].id
                        },
                        logging: false
                    })
                }
            }
            // res.redirect('/job')
            res.json({
                    expired_at_list,
                    expired_at_list
            })
        }catch(err){

        }
    }
}

// EXPORTS
module.exports = jobController;