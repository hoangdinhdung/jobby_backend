// REQUIRES //
const models = require('../../models');
const { Op } = require('sequelize');

// CONTROLLER //
const bookmarkController = {
    bookmarkFullList: async(req, res, next) =>{
        try{
            const bookmarks = await models.Bookmark.findAll({
                //include: ['candidate_by'],
                where: {
                    by_candidate:{
                        [Op.eq]: 2
                    }
                },
                logging: false,
            });

            res.json({
                bookmarks
            })
        }catch(err){
            console.error(`ERROR: ${err}`)
        }
    }
};

// EXPORTS //
module.exports = bookmarkController;