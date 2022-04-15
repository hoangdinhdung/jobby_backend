// REQUIRES //
const models = require('../models');
const { Op } = require("sequelize");

// HOME CONTROLLER //
const homeController = {
    index: async (req, res) => {
        //Lấy danh sách thành phố //
        const states = await models.State.findAll({
            attributes: ['image', 'name', 'jobs'],
            logging: false,
        })

        // Lấy sô liệu trang web (home) //
        const data = await models.Data.findByPk(1, {
            logging: false,
            //attributes: ['register_member', 'job_found', 'best_companies']
        })

        // Lấy document type offer//
        const offers = await models.Document.findAll({
            attributes: ['title', 'description'],
            where: {
                type: {
                    [Op.eq]: 'offer'
                }
            },
            logging: false,
        },  
        )

        // Lấy danh sách job mới nhất //
        const jobs = await models.Job.findAll({
            logging: false,
            //attributes: ['expired_at']
            include: ['candidate', 'company', 'bookmark'], 
            offset: 1,
            limit: 3,
            order: [
                ['created_at', 'DESC']
            ]
        });

        // Lấy danh sách category ///
        const categories = await models.Category.findAll({
            limit: 12,
            attributes: ['name', 'jobs', 'image'],
            logging: false,
        });

        // Lấy document post job //
        const documents = await models.Document.findAll({
            attributes: ['type','title', 'description'],
            where: {
                type: {
                    [Op.or]:['post job', 'talented candidates', 'introduce']
                    
                }
            },
            limit: 1000,
            logging: false,
        });

        //console.log(documents)


        // render // 
        res.render('index', { 
            states,
            data,
            offers,
            jobs,
            categories,
            documents
        });
    }
}

// EXPORTS //
module.exports = homeController;