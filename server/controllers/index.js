var models = require('../models');
var mysql = require('mysql');
var request = require('request');
// var Promise = require('bluebird')

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'student', 'student', {});

var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  }
},
{ timestamps: false });

var Message = db.define('Message', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
},
{  timestamps: false });



// var con = mysql.createConnection({
//   host: "127.0.0.1",
//   port: '3306',
//   user: "student",
//   password: "student",
//   database: "chat"
// });

// var con2 = mysql.createConnection({
//   host: "127.0.0.1",
//   port: '3306',
//   user: "student",
//   password: "student",
//   database: "chat"
// });

// con.connect(err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connected!');
//   }
// });

// function queryCB(sql, req, res) {
//   con.query(sql, (err, results) => {
//     if (err) {
//       console.log(err);
//       resHandler(req, res, 404, null);
//     } else {
//       console.log("SUCCESS!");
//       console.log(results);
//       resHandler(req, res, 201, results);
//     }
//   });
// }

function resHandler(req, res, statusCode, results) {
  db.close();
  statusCode = statusCode || 200;
  res.status(statusCode);
  if (req.method === "GET") {
    res.end(JSON.stringify(results));
  } else {
    // db.close();
    res.end();
  }
}

module.exports = {

  messages: {
    get: function (req, res) {
      //var sql = `SELECT * FROM messages`;
      //queryCB(sql, req, res);
      Message.findAll({})
      .then((data) => {
        resHandler(req, res, 200, data);
        // db.close();
        console.log('code still runs');
      })
      .catch((err) => {
        console.error(err);
        // db.close();
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //var sql = `INSERT INTO messages (username, message,roomname) VALUES ('${req.body.username}', "${req.body.message}", '${req.body.roomname}')`;
      //console.log(sql);
      //queryCB(sql, req, res);
      Message.create({ username: req.body.username, message: req.body.message, roomname: req.body.roomname })
        .then(() => {
          resHandler(req, res, 201, null);
          // db.close();
        })
        .catch(function (err) {
          console.error(err);
          // db.close();
        });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      User.findAll({}).then((data) => {
        resHandler(req, res, 200, data);
        // db.close();
        console.log('code still runs');
      })
      .catch(err => {
        console.error(err);
      })
    },

    post: function (req, res) {
      // var sql = `INSERT INTO users (username) VALUES ('${req.body.username}')`;
      // queryCB(sql, req, res);
      User.create({ username: req.body.username }).then(() => {
        resHandler(req, res, 201, null);
        // db.close();
      })
        .catch(function (err) {
          console.error(err);
          // db.close();
        });
    }
  }
};


// db.close();
// con.end();
// con.end();