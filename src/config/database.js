// const mysql = require("mysql");

// const DBConn =  mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: ""
// })

// DBConn.connect(function(err){
//     if(err) throw err;
//     console.log("Connected successfully!!!");
// })

// module.exports = DBConn;

module.exports = {
    "development": {
      "username": "root",
      "password": '',
      "database": "jobby_db",
      "host": "127.0.0.1",
      "dialect": "mysql",
      //"logging": false,
      "define": {
        "underscored": true
      }
    },
    "test": {
      "username": "root",
      "password": '',
      "database": "jobby_db",
      "host": "127.0.0.1",
      "dialect": "mysql",
      //"logging": false,
      "define": {
        "underscored": true
      }
    },
    "production": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": "jobby_db",
      //"logging": false,
      "define": {
        "underscored": true
      }
    }
  }