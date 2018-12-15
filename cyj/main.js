//const hostname = "106.10.54.24";
const hostname = "0.0.0.0";
const port = "8888";
const express = require("express");
const app = express();
const mysql = require("mysql");

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "18DBpro+",
  port: "3306",
	database: "CARCENTER",
});
con.connect(function(err){
  if(err) throw err;
});

console.log('running');
app.get("/",function(req,res) {
	res.send("hello, World!");
});
app.get("/db", function(req, res, next) {
  console.log("db_test");
  con.query('SELECT * from 고객',function(err,rows,fields){
    if(!err)
      console.log(rows);
    else {
      console.log('Error',err);
    }
  })

});

const server = app.listen(port, hostname, () => {
	console.log("Server running...");
});
