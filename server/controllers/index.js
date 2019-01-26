var models = require('../models');
var mysql = require('mysql');
var request = require('request');
var bodyParser = require('body-parser');
// var Promise = require('bluebird')

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: '3306',
  user: "student",
  password: "student",
  database: "chat"
});

con.connect(err => {
  if (err) { console.log(err); }
  else {
    console.log('connected!');
  }
})

// function insertCB(err, callback) {
//   if (err) {
//     console.log(err);
//     callback(err);
//   } else {
//     console.log('record inserted');
//     callback();
//   }
// }

function queryCB(sql, req, res) {
  con.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      resHandler(req, res, 404, null);
    } else {
      console.log("SUCCESS!");
      console.log(results);
      resHandler(req, res, 201, results);
    }
  });
}

function resHandler(req, res, statusCode, results) {
  statusCode = statusCode || 200;
  res.status(statusCode);
  if (req.method === "GET") {
    res.end(JSON.stringify(results));
  } else {
    res.end();
  }
}

module.exports = {
  
  messages: {
    get: function (req, res) {
      var sql = `SELECT * FROM messages`;
      queryCB(sql, req, res);

    }, // a function which handles a get request for all messages
    post: function (req, res) {
    
      // username: 'Valjean',
      // message: 'In mercy\'s name, three days is all I need.',
      // roomname: 'Hello'
      var sql = `INSERT INTO messages (username, message,roomname) VALUES ('${req.body.username}', "${req.body.message}", '${req.body.roomname}')`;
      console.log(sql);
      queryCB(sql, req, res);
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {


    },



    post: function (req, res) {
      var sql = `INSERT INTO users (username) VALUES ('${req.body.username}')`;
      queryCB(sql, req, res);
    }
  }
};

