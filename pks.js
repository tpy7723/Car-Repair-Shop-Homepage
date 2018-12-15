var http= require('http');
var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./database.js');
var connection = mysql.createConnection(dbconfig);
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
const https = require('https')
app.io = io
var app = express();

// ADD THIS
var cors = require('cors');
app.use(cors());


const router = express.Router();

router.post('/call/review', (req, res, next)=>{
  console.log('in call/review')
  con.query('SELECT * from 후기', (e, r, f)=>{
      if(e){
          res.send({
              status: 'error',
              errMsg: '에러.'
          })
      }
      else {
          res.send({
              status: 'success',
              data: r
          })
      }
  })
})
app.get('/', function(req, res){
  res.send('Root2');
  res.send('Rooat2');
});
app.get('/login', function(req, res){
  res.send('Root');
});
app.get('/calsdl/review', function(req, res){ //게시판 띄우기
  res.send('Root');
});
app.get('/request/review', function(req, res){ //게시글 등록
  res.send('Root');
});
app.get('/call/question', function(req, res){
  console.log('in call/question')
//  res.send('hell0');

  connection.query('SELECT * from 질문게시판',(e,r,f)=>{
	res.setHeader('Content-Type', 'text/plain');
	if(e){
		console.log(e)
		res.send({
			status:'error',
			errMsg:'에러',
		})
	}
	else{
		res.send({
			status: 'success',
			result: JSON.parse(JSON.stringify(r)),
      fields: f
		})
	}
  })

});
app.get('/request/question', function(req, res){ //등록
  res.send('Root');
});
app.get('/call/reservation', function(req, res){
  res.send('Root');
});
app.get('/request/reservation', function(req, res){
  res.send('Root');
});
// configuration ===============================================================
app.set('port', process.env.PORT || 3000); app.listen(app.get('port'),
function () {
  console.log('Express server listening on port ' + app.get('port'));
});
