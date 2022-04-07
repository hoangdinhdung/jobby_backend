// requires 
const models = require('../models');

const stateController = {
    stateFullList: async(req, res) => {
        try{
            states = await models.State.findAll({
                //attributes : ['name'],
                logging : false,
            }
                
            );

            return res.json({
                states
            })
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    },

   createState: async(req, res) => {
       try{
            await models.State.create({
                name: req.body.name,
                jobs: req.body.jobs,
            },{
                logging : false,
            });

            res.redirect('/state');
       }catch(err){
            console.log(`ERROR: ${err}`);
       }
       
   },

   //tăng số lượng job lên 1
   increaseJobs: async (req, res) => {
       try{
            const stateFound = await models.State.findByPk(req.params.id,{
                logging : false,
            }
            );

            await models.State.update(
            {
                name: stateFound.name,
                jobs: stateFound.jobs + 1,
            },
            {
                where: {
                    id: stateFound.id
                },
                logging: false
                
            })

            res.redirect('/state');
       }catch(err){
            console.log(`ERROR: ${err}`);
       }
   },

   updateState: async (req, res) => {
       try{
            const stateFound = await models.State.findByPk( req.params.id, {
                logging : false,
            })

            await models.State.update({
                name: req.body.name,
                jobs: req.body.jobs
            }, 
            {
                where: {
                    id: stateFound.id
                },
                logging : false
            })

            res.redirect('/state');
       }catch(err){
            console.log(`ERROR: ${err}`);
       }
   },

   stateById: async(req, res) => {
       try{
            const stateFound = await models.State.findByPk( req.params.id, {
                logging: false
            })
            res.json({
                state: stateFound
            })
       }catch(err){
            console.log(`ERROR: ${err}`);
       }
   }, 

   deleteState: async (req, res) => {
       try{
           await models.State.destroy({
               where: {
                   id: req.params.id
               },
               logging : false
           });

           res.redirect('/state');
       }catch(err){
        console.log(`ERROR: ${err}`);
       }
   }
}

module.exports = stateController;