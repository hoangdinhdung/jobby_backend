// REQUIRES
const models = require('../../models');
const { Op } = require("sequelize");

// JOB CONTROLLER
const jobController = {
    JobFullList: async(req, res) =>{
        const jobList = await models.Job.findAll({
            logging: false,
            //attributes: ['expired_at']
            // include: ['candidate', 'company', 'bookmark'], 
            offset: 1,
            // limit: 3,
            order: [
                ['created_at', 'DESC']
            ],
            where: {
                id:{
                    [Op.ne]: 0,
                },
            },
        });
        res.json({
            jobList: jobList
        })
    },

    // Hiển thị job mới nhất (Home Page)
    findLatestJobs: async(req, res) =>{
        try{
            const latestJobs = await models.Job.findAll({
                // include: [{
                //     all: true,
                //     nested: true
                // }],
                order: [
                    ['created_at', 'DESC']    
                ],
                limit: 6,
                logging: false,
                where:{
                    id:{
                        [Op.ne]: 0,
                    },
                },
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
                // include: [{
                //     all: true,
                //     nested: true
                // }],
                order: [
                    ['created_at', 'DESC']    
                ],
                limit: 6,
                offset: 6 * (req.query.page - 1), 
                logging: false,
                where: {
                    id:{
                        [Op.ne]: 0
                    }
                }
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
                logging: false,
                where:{
                    id:{
                        [Op.ne]: 0
                    }
                }
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
                logging: false,
                where:{
                    id:{
                        [Op.ne]: 0
                    }
                }
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
                    [Op.and]: [
                        {
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
                            ],
                        },
                        {
                            id:{
                                [Op.ne]: 0, 
                            },
                        },
                    ],
                },
                logging: false
            });

            if(result){
                res.json({
                    result
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

    // cập nhật status job
    jobUpdateStatus: async (req, res)=>{
        try{
            var expired_at_list = await models.Job.findAll({
                attributes: ['id','expired_at'],
                logging: false
            });

            // console.log(expired_at_list[0])
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
            res.redirect('/api/v1/job');
            // res.json({
            //         expired_at_list,
            //         expired_at_list
            // })
        }catch(err){

        }
    },

    createJob: async(req, res) =>{
        try{
            const expired = new Date(Date.now() + 2564699880);
            var expired_at;
            if(expired.getMonth() < 9){
                expired_at = "" + expired.getFullYear() + "-0" + (expired.getMonth() + 1) + "-" + expired.getDate();
            }else{
                expired_at = "" + expired.getFullYear() + "-" + (expired.getMonth() + 1) + "-" + expired.getDate();
            }
            
            await models.Job.create({
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                category: req.body.category,
                availability: req.body.availability,
                hourly: req.body.hourly,
                experience_level: req.body.experience_level,
                salary_min: req.body.salary_min,
                location: req.body.location,
                languages: req.body.languages,
                skills: req.body.skills,
                file: req.body.file,
                views: 0,
                // id_candidate: req.session.id_candidate, // nếu đã có thông tin người dùng trong session
                id_candidate: req.query.id_candidate,
                id_company: req.query.id_company,
                expired_at: expired_at,
            },{
                logging: false,
            }
            
        )

            res.redirect('/api/v1/job');
           // console.log(expired_at);
        }catch(err){
            console.error(`ERROR: ${err}`);
        }
    },

    // Sửa thông tin job ///
    updateJob: async(req, res) =>{
        try{

            const jobFound = await models.Job.findByPk( req.params.id, {
                logging : false,
                offset: 1,
            })
            if(jobFound && jobFound.id != 0){
                await models.Job.update({
                    name: req.body.name,
                    description: req.body.description,
                    type: req.body.type,
                    category: req.body.category,
                    availability: req.body.availability,
                    hourly: req.body.hourly,
                    experience_level: req.body.experience_level,
                    salary_min: req.body.salary_min,
                    location: req.body.location,
                    languages: req.body.languages,
                    skills: req.body.skills,
                    file: req.body.file,
                    // id_candidate: req.session.id_candidate, // nếu đã có thông tin người dùng trong session
                },{
                    where: {
                        id:{
                            // [Op.eq]: req.session.id, // nếu đã lưu thông tin người dùng trong session
                            [Op.eq]: req.params.id
                        }
                    },
                    logging: false,
                });
    
                res.redirect('/api/v1/job/details/' + req.params.id);
            }else{
                res.json({
                    "fail": "no record with id " + req.params.id,

                });
            }
        }catch(err){
            console.error(`ERROR: ${err}`);
        }
    },

    deleteJob: async (req, res) => {
        try{
            const jobFound = await models.Job.findByPk( req.params.id, {
                logging : false,
            });
            if(jobFound){
                await models.Job.destroy({
                    where:{
                        id:{
                            [Op.eq] : jobFound.id
                        }
                    }
                });

                res.redirect('/api/v1/job');
            }else{
                res.json({
                    unsuccess: "no record with id " + req.params.id,
                })
            }

        }catch(err){
            console.error(`ERROR: ${err}`);
        }
    },
}

// EXPORTS
module.exports = jobController;