const express = require("express");
const path = require("path");
//create express app
const app = express();



//set up the port server
const port = process.env.PORT || 3000;

// define use
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//----------* VIEW ENGINE SETUP *----------//
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


//import test api routes
const adminRoute = require('./src/routes/test_api/admin');
const stateRoute = require('./src/routes/test_api/state');
const jobRoute = require('./src/routes//test_api/job');
const categoryRoute = require('./src/routes/test_api/category');
const candidateRoute = require('./src/routes/test_api/candidate');
const projectRoute = require('./src/routes/test_api/project');
const bookmarkRoute = require('./src/routes/test_api/bookmark');

//create test api Routes
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/state', stateRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/candidate', candidateRoute);
app.use('/api/v1/project', projectRoute);
app.use('/api/v1/bookmark', bookmarkRoute);


// import routes (Main)
const homeRoute = require('./src/routes/home');

// use routes (Main)
app.use('/', homeRoute);

// Listen server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});