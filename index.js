const express = require('express');
const app = express();
const fs = require("fs");
const dateInfo = require('/dateTime_ET.js')
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/',(req, res)=>{
	res.render('index');
});
app.get('/timenow',(req, res)=>{
	const dateNow = dateInfo.dateNowET();
	const timeNow = dateInfo.timeNowET();
	res.render('timenow', {dateN: dateNow, timeN: timeNow});
});
app.get('/wisdom',(req, res)=>{
	let folkWisdom = [];
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
app.listen(5207);
