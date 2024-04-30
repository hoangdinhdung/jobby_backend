const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT = require('./src/middlewares/JWT');
const { Op } = require('sequelize');
const routes = require('./routes');

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

// //----------* API *----------//
app.use(routes);

//----------* IMPORT MAIN ROUTES *----------//
const homeRoute = require('./src/routes/home');

//----------* USE MAIN ROUTES *----------//
app.use('/', homeRoute);

//----------* LISTEN SERVER *----------//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});