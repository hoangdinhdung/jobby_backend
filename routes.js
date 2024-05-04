const express = require("express");
const JWT = require('./src/middlewares/JWT');
const fs = require('fs');
const path = require("path");


//----------* TEST API ROUTES *----------//
const adminRoute = require('./src/routes/test_api/admin');
const stateRoute = require('./src/routes/test_api/state');
const jobRoute = require('./src/routes//test_api/job');
const categoryRoute = require('./src/routes/test_api/category');
const candidateRoute = require('./src/routes/test_api/candidate');
const projectRoute = require('./src/routes/test_api/project');
const bookmarkRoute = require('./src/routes/test_api/bookmark');

// const 
const router = express.Router();

//----------* DEFINE ROUTER *----------//
router.use('/api/v1/admin', adminRoute);
router.use('/api/v1/state', JWT.authenToken, stateRoute);
router.use('/api/v1/job', JWT.authenToken, jobRoute);
router.use('/api/v1/category', JWT.authenToken, categoryRoute);
router.use('/api/v1/candidate', JWT.authenToken, candidateRoute);
router.use('/api/v1/project', JWT.authenToken, projectRoute);
router.use('/api/v1/bookmark', JWT.authenToken, bookmarkRoute);

//----------* DEFINE ROUTER API  *----------//
const folderPathRoutes = path.join(__dirname, 'src', 'routes', 'api');

// get file in folder
fs.readdir(folderPathRoutes, (err, files) => {
    if (err) {
        console.error('Lỗi khi đọc thư mục:', err);
        return;
    }
    
    files.forEach(file => {
        // check if file is js file
        if(file.slice(-3) === '.js'){
            try{
                const apiRoute = require(path.join(__dirname, 'src', 'routes', 'api', file));
                if(file.replace('.js', '') == 'auth'){
                    router.use(`/api/v1/${file.replace('.js', '')}`, apiRoute); 
                }else{
                    router.use(`/api/v1/${file.replace('.js', '')}`, JWT.authenToken, apiRoute); 
                }
            }catch(error){
                console.log(`ERROR: ${error}`);
            }
        }
    });
});
//----------* DEFINE ROUTER API  *----------//




module.exports = router;