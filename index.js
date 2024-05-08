const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);
const mysql = require('mysql');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT = require('./src/middlewares/JWT');
const { Op } = require('sequelize');
const routes = require('./routes');
const morgan = require('morgan');
const monent = require("moment");
require('colors');

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

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/src/config/database.js')[env];
const dbConfig = {
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
};
const sessionStore = new mysqlSession({
  expiration: process.env.MAX_AGE_SESSION || 86400000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessiondatas',
    columnNames: {
      session_id: 'sid',
      expires: 'expires',
      data: 'session_data'
    }
  }
}, mysql.createConnection(dbConfig));

app.use(session({
  secret: process.env.SECRET_SESSION || 'jobby',
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: process.env.MAX_AGE_COOKIE || 86400000 // milliseconds
  }
}));
const customFormat = (tokens, req, res) => {
  if (
    tokens.status(req, res) >= 200 &&
    tokens.status(req, res) <= 299
  ) {
    console.log(`${[
      new monent().format('DD/MM/YYYY HH:mm:ss'), // Thời gian
      tokens.method(req, res), // Phương thức HTTP (GET, POST, v.v.)
      tokens.url(req, res), // URL yêu cầu
      tokens.status(req, res), // Mã trạng thái HTTP
      tokens.res(req, res, 'content-length'), // Kích thước nội dung phản hồi
      '-', // Đã loại bỏ user-agent để giảm dung lượng log
      tokens['response-time'](req, res), // Thời gian phản hồi
      'ms' // Đơn vị thời gian
    ].join(' ')}`.green);
  } else if (
    tokens.status(req, res) >= 400 &&
    tokens.status(req, res) <= 499
  ) {
    console.log(`${[
      new monent().format('DD/MM/YYYY HH:mm:ss'), // Thời gian
      tokens.method(req, res), // Phương thức HTTP (GET, POST, v.v.)
      tokens.url(req, res), // URL yêu cầu
      tokens.status(req, res), // Mã trạng thái HTTP
      tokens.res(req, res, 'content-length'), // Kích thước nội dung phản hồi
      '-', // Đã loại bỏ user-agent để giảm dung lượng log
      tokens['response-time'](req, res), // Thời gian phản hồi
      'ms' // Đơn vị thời gian
    ].join(' ')}`.magenta);
  } else if (
    tokens.status(req, res) >= 500 &&
    tokens.status(req, res) <= 599
  ) {
    console.log(`${[
      new monent().format('DD/MM/YYYY HH:mm:ss'), // Thời gian
      tokens.method(req, res), // Phương thức HTTP (GET, POST, v.v.)
      tokens.url(req, res), // URL yêu cầu
      tokens.status(req, res), // Mã trạng thái HTTP
      tokens.res(req, res, 'content-length'), // Kích thước nội dung phản hồi
      '-', // Đã loại bỏ user-agent để giảm dung lượng log
      tokens['response-time'](req, res), // Thời gian phản hồi
      'ms' // Đơn vị thời gian
    ].join(' ')}`.red);
  }


};
app.use(morgan(customFormat));
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

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at: reason:', reason);
  // Xử lý lỗi ở đây
  // Ví dụ: throw reason; hoặc process.exit(1);
});