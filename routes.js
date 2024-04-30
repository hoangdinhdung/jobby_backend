const express = require("express");
const JWT = require('./src/middlewares/JWT');

//----------* TEST API ROUTES *----------//
const adminRoute = require('./src/routes/test_api/admin');
const stateRoute = require('./src/routes/test_api/state');
const jobRoute = require('./src/routes//test_api/job');
const categoryRoute = require('./src/routes/test_api/category');
const candidateRoute = require('./src/routes/test_api/candidate');
const projectRoute = require('./src/routes/test_api/project');
const bookmarkRoute = require('./src/routes/test_api/bookmark');

const testRoute = require("./src/routes/api/test");
const authRoute = require("./src/routes/api/auth");
const router = express.Router();

//----------* DEFINE ROUTER *----------//
router.use('/api/v1/admin', adminRoute);
router.use('/api/v1/state', JWT.authenToken, stateRoute);
router.use('/api/v1/job', JWT.authenToken, jobRoute);
router.use('/api/v1/category', JWT.authenToken, categoryRoute);
router.use('/api/v1/candidate', JWT.authenToken, candidateRoute);
router.use('/api/v1/project', JWT.authenToken, projectRoute);
router.use('/api/v1/bookmark', JWT.authenToken, bookmarkRoute);

router.use('/api/v1/test', testRoute);
router.use('/api/v1/auth', authRoute);




module.exports = router;