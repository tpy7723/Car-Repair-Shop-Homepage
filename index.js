var express    = require('express');
var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);


app.get('/', function(req, res){
  res.send('Root');
});

app.get('/login', function(req, res){
  res.send('Root');
});
/*app.get('/call/review', function(req, res, next){ //게시판 띄우기
  con.query('SECLECT * from 후기',())
});*/
app.get('/request/review', function(req, res){ //게시글 등록
  res.send('Root');
});

/*app.get('/call/question', function(req, res){
  res.send('Root');
});*/
app.get('/request/question', function(req, res){ //등록
  res.send('Root');
});

app.get('/call/reservation', function(req, res){
  res.send('Root');
});
app.get('/request/reservation', function(req, res){
  res.send('Root');
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
