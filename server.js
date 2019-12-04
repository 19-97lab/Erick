const express = require ('express');
const mysql =require('mysql');
const app = express();

const con =mysql.createConnection({

host :"localhost",
user : "root",
password :"root",
database :"iststudent"
});


con.connect ((err)=>{
if(!err)
	console.log('connected');
else
	console.log('Failed' + err);

});

app.get("/" ,function(req,res){

res.sendFile(__dirname + "/" + "login.html");


});

app.get("/login",function(req,res){

let Username =req.query.usrname;
let password  =req.query.password;
res.send(`Username:${Username}
	password:${password}`);


});

app.get("/reg_form" ,function(req,res){

res.sendFile(__dirname + "/" + "register.html");


});

app.get("/register" ,function(req,res){

let firstName=req.query.fname;
let LastName=req.query.lname;
let Gender=req.query.gender;
let Counties =req.query.County;
let email =req.query.email;
let  Username =req.query.usrname;
let Password =req.query.pword;
let course=req.query.course;

//first comes the names of the columns then the variables assigned 
con.query(`INSERT INTO register(fname,lname,gender,counties,email,username,password,course) VALUES ('${firstName}', '${LastName}','${Gender}','${Counties}','${email}','${Username}','${Password}','${course}')`,(err,rows,fields)=>{
    if (!err)
      console.log(rows);
    else
      console.log(err);
   });

   res.redirect('/');

});

//Select all from register (myTable)
app.get('/view', function (req, res) {
   con.query(`SELECT * FROM register`,(err,rows,fields)=>{
    if (!err){
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
   });

});
app.get('/Select', function (req, res){
	con.query(`SELECT fname,lname FROM register`,(err,rows,fields)=>{
    if (!err){
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
   });

});

   app.get('/login', function (req, res) {
   res.sendFile( __dirname + "/" + "workspace.html");
});
app.listen(8080);