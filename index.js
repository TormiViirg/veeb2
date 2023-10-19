const express = require('express');
const app = express();
const fs = require("fs");
const mysql = require('mysql2');
const bodyparser = require('body-parser');
// remember to circle back const dateInfo = require('/dateTime_et')
const dbConfig = require('../../vp23config');
const dataBase = 'if23_tormi_vi'
let folkWisdom = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));

const conn = mysql.createConnection({
	host: dbConfig.configData.host,
	user: dbConfig.configData.user,
	password: dbConfig.configData.password,
	database: 'if23_tormi_vi'
});

app.get('/',(req, res)=>{
	res.render('index');
});
app.get('/timenow',(req, res)=>{
	const dateNow = dateInfo.dateNowET();
	const timeNow = dateInfo.timeNowET();
	res.render('timenow', {dateN: dateNow, timeN: timeNow});
});
app.get('/wisdom',(req, res)=>{
	fs.readFile("/txtfiles/vanasõnad.txt", "utf8", (err, data)=>{
		if(err){
			console.log(err);
		}
		else {
			folkWisdom = data.split(";");
			res.render('justlist',{h1: 'Vanasõnad', wisdowms: folkWisdom});
		}
	});
});
app.get('/eestifilm',(req, res)=>{
	res.render('eestifilmindex');
});
app.get('/eestifilm/filmiloeng',(req, res)=>{
	let sql = 'SELECT title, production year FROM movie';
	let sqlresult = [];
	conn.query(sql,(err, result)=>{
		if (err) {
			throw err;
		}
		else {
			sqlresult = result;
			res.render('eestifilmlist', {filmlist: sqlresult});
		}
	});
	res.render('eestifilmlist', {filmlist: sqlresult});
});
app.get('/nimed', (req, res)=>{
	fs.readFile("txtfiles/log.txt", "utf8", (err, data)=>{	
		if(err){
			console.log(err);
		}
		else{
			nimed = data.split(";");
			res.render('nimed', {h1: 'nimed', names: nimed});
		}
	});
});	
app.get('/eestifilm/lisapersoon',(req, res)=>{
	res.render('eestifilmaddpersoon');
});
app.post('/eestifilm/lisapersoon', (req, res)=>{
	console.log(req.body);
	let notice = '';
	let sql = 'INSERT INTO person (first_name, last_name, birth_date) VALUES (?,?,?)';
	conn.query(sql, [req.body.firstNameInput,  req.body.lastNameInput, req.body.birthDateInput], (err, result)=>{
		if(err) {
			throw err;
			notice = 'Andmete salvestamine ebaõnnestus!' + err;
			res.render('eestifilmaddpersoon', {notice: notice});
		}
		else {
			notice = 'Filmitegelase ' + req.body.firstNameInput + '' + req.body.lastNameInput + 'salvestamine õnnestus!';
			res.render('eestifilmaddpersoon', {notice: notice});
		}
	});
});
app.listen(5207);
