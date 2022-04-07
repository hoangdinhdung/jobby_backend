const express = require("express");


//create express app
const app = express();

//set up the port server
const port = process.env.PORT || 3000;

// define use
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//define root route
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//import routes
const adminRoute = require('./src/routes/admin');
const stateRoute = require('./src/routes/state');
const jobRoute = require('./src/routes/job');
const categoryRoute = require('./src/routes/category');
const candidateRoute = require('./src/routes/candidate');
const projectRoute = require('./src/routes/project');

//create Routes
app.use('/admin', adminRoute);
app.use('/state', stateRoute);
app.use('/job', jobRoute);
app.use('/category', categoryRoute);
app.use('/candidate', candidateRoute);
app.use('/project', projectRoute);

// Listen server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});