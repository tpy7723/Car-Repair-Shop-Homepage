var http = require('http');
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
require('date-utils');

// ADD THIS
var cors = require('cors');
app.use(cors());


const router = express.Router();

app.get('/login_em', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  console.log('in login_em')
  console.log(req.query);
  var id = req.query.id,
      password = req.query.password;
  console.log('ID'+id+'  password'+password);
//  res.send('hell0');
//con.query('update Student SET token = ? WHERE studentId = ?', token, id, (err, result, fields)=>{
  connection.query('SELECT * from 직원 WHERE 직원번호=?',[id],(e,r,f)=>{
  	if(e){
  		console.log('error : \n'+e)
  		res.send({
  			status:'error',
  			errMsg:'에러'
  		})
  	}
  	else{
      console.log(r[0].비밀번호)
      if(r[0].비밀번호 == password ){
        console.log('login pass')
        res.send({
          status: 'success',
          result: JSON.parse(JSON.stringify(r)),
          field: f
        })
      }
      else{
        console.log('no user')
        res.send({
  				status: "no-user"
  			})
      }
	}
})
});

app.get('/', function(req, res) {
  res.send('Root');
});

app.get('/login', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  console.log('in login_em')
  console.log(req.query);
  var id = req.query.id,
      password = req.query.password;
  console.log('ID'+id+'  password'+password);
//  res.send('hell0');
//con.query('update Student SET token = ? WHERE studentId = ?', token, id, (err, result, fields)=>{
  connection.query('SELECT * from 고객 WHERE ID=?',[id],(e,r,f)=>{
  	if(e){
  		console.log('error : \n'+e)
  		res.send({
  			status:'error',
  			errMsg:'에러'
  		})
  	}
  	else{
      console.log(r[0].비밀번호)
      if(r[0].비밀번호 == password ){
        console.log('login pass')
        res.send({
          status: 'success',
          result: JSON.parse(JSON.stringify(r)),
          field: f
        })
      }
      else{
        console.log('no user')
        res.send({
  				status: "no-user"
  			})
      }
	}
})
});
app.get('/call/review', function(req, res) {
   console.log('in call/review')
   connection.query('SELECT * from 후기', (e, r, f) => {

   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
 })
});

app.get('/request/review', function(req, res) { //게시글 등록
   var newDate = new Date(); // 현재 시각 받아옴
   var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
   console.log(req.query);
   var context = req.query.내용,
       id = req.query.ID;
       num = req.query.접수번호;
   connection.query('insert into 후기 values (?,?,?,?)',[context,time,num,id],(e,r,f) =>{
        res.setHeader('Content-Type', 'text/plain');
            if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});


app.get('/call/question', function(req, res) {
  console.log('in call/question')
  //  res.send('hell0');

  connection.query('SELECT * from 질문게시판', (e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});

app.get('/request/question', function(req, res) { //등록
   var newDate = new Date(); // 현재 시각 받아옴
   var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
   console.log(req.query);
   var context = req.query.질문내용,
       id = req.query.ID;
   connection.query('insert into 질문게시판 values (0,?,?,?)',[context,time,id],(e,r,f) =>{
   console.log(connection.query);
	res.setHeader('Content-Type', 'text/plain');
	    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});

app.get('/call/reservation', function(req, res) {
  console.log('in call/reservation')
  console.log(req.query);
  var id_reserv = req.query.ID;
  connection.query('SELECT * FROM 예약 WHERE ID=?',id_reserv,(e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log('에러'+e)
      res.send({
        status: 'error',
        errMsg: '에러'
      })
    } else {
      console.log(r)
      if(r[0].ID != id_reserv){
        res.send({
          status:'success',
          Msg:'no-result'
        })
      }
      else{
        res.send({
          status: 'success',
          result: JSON.parse(JSON.stringify(r)),
          Msg: 'yes'
        })
      }
    }
  })
});

app.get('/log', function(req, res) {
   console.log('in log')
   console.log(req.query);
   var id_log = req.query.ID;
   connection.query('SELECT * from 수리기록 WHERE ID = ?',id_log, (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
 })
});

app.get('/call/review_detail', function(req, res) {
  console.log('in /call/review_detail')
  console.log(req.query);
  var id_log = req.query.ID;
  connection.query('SELECT 이름,문제점,수리시작날짜,수리완료날짜 from 수리기록 NATURAL JOIN 직원 WHERE ID = ?',id_log, (e, r, f) => {
  res.setHeader('Content-Type', 'text/plain');
  if (e) {
     console.log(e)
     res.send({
       status: 'error',
       errMsg: '에러',
     })
   } else {
     console.log(r)
     res.send({
       status: 'success',
       result: JSON.parse(JSON.stringify(r)),
       fields: f
     })
   }
 })
});


app.get('/request/reservation', function(req, res) {
  res.send('Root');
});


// configuration ===============================================================
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),
  function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
