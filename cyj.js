var express    = require('express');
var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();
const router = express.Router();

app.get('/login_em', function(req, res){
  console.log('in login_em')
  console.log(req.query);
  var id = req.query.id,
      password = req.query.password+'\r';
//  res.send('hell0');
//con.query('update Student SET token = ? WHERE studentId = ?', token, id, (err, result, fields)=>{
  connection.query('SELECT * from 직원 WHERE 직원번호=?',id,(e,r,f)=>{
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

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
