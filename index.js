const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT = require('./src/middlewares/JWT');
const { Op } = require('sequelize');
//----------* CREATE EXPRESS APP *----------//
const app = express();



//SET UP THE PORT SERVER
const port = process.env.PORT || 3000;

// USE MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(session({
  secret: 'jobby',
  resave: true,
  saveUninitialized: true
}));

//----------* VIEW ENGINE SETUP *----------//
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


//----------* TEST API ROUTES *----------//
const adminRoute = require('./src/routes/test_api/admin');
const stateRoute = require('./src/routes/test_api/state');
const jobRoute = require('./src/routes//test_api/job');
const categoryRoute = require('./src/routes/test_api/category');
const candidateRoute = require('./src/routes/test_api/candidate');
const projectRoute = require('./src/routes/test_api/project');
const bookmarkRoute = require('./src/routes/test_api/bookmark');

//----------* USE API ROUTES *----------//
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/state', JWT.authenToken, stateRoute);
app.use('/api/v1/job', JWT.authenToken, jobRoute);
app.use('/api/v1/category', JWT.authenToken, categoryRoute);
app.use('/api/v1/candidate', JWT.authenToken, candidateRoute);
app.use('/api/v1/project', JWT.authenToken, projectRoute);
app.use('/api/v1/bookmark', JWT.authenToken, bookmarkRoute);


//----------* IMPORT MAIN ROUTES *----------//
const homeRoute = require('./src/routes/home');

//----------* USE MAIN ROUTES *----------//
app.use('/', homeRoute);

//----------* LISTEN SERVER *----------//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});