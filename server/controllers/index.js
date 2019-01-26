var models = require('../models');
var mysql = require('mysql');
var request = require('request');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: '3306',
  user: "student",
  password: "student",
  database: "chat"
});

function insertCB(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log('record inserted');
  }
}

function queryCB(sql) {
  con.connect(err => {
    if (err) { console.log(err); }
    else {
      console.log('POSTED!');
      con.query(sql, insertCB);
    }
  })
}

module.exports = {
  
  messages: {
    get: function (req, res) {console.log("here");}, // a function which handles a get request for all messages
    post: function (req, res) { 
    
      // username: 'Valjean',
      // message: 'In mercy\'s name, three days is all I need.',
      // roomname: 'Hello'
      var sql = `INSERT INTO messages (username, message,roomname) VALUES (${req.body.username}, ${req.body.message}, ${req.body.roomname})`;
      console.log(sql);
      queryCB(sql);
      res.status(201);
      res.end();

    
    res.end(); } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var sql = `INSERT INTO users (username) VALUES ('${req.body.username}')`;
      queryCB(sql);
      res.status(201);
      res.end();
    }
  }
};

