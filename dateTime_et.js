const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
const monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateENformatted = function(){
	let timeNow = new Date ();
	return monthNamesEN[timeNow.getMonth()] + " " + timeNow.getDate() + " " + timeNow.getFullYear();
}

const date.ENShort = function(){
	let timeNow = new Date();
	return (timeNow.getMonth() +1) + "/" + timeNow.getDate() + " " + timeNow.getFullYear();
}

const timeENformatted = function(){
	let timeNow = new Date();
	return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" +timeNow.getSeconds();
}

const dateETformatted = function(){
	let timeNow = new Date ();
	return timeNow.getDate() + "." + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}

const timeETformatted = function(){
	let timeNow = new Date();
	return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" +timeNow.getSeconds();
}

const timeOfDayET = function(){
	let partOfDay = "suvaline aeg";
	let hourNow = new Date().getHours();
	if (hourNow => 6 && hourNow < 12){
		partOfDay = "hommik";
	}
	if (hourNow > 12 && hournow < 14){
		partOfDay = "keskpäev";
	}
	if (hourNow > 14 && hournow < 18){
		partOfDay = "pärastlõuna";
	}
	if (hourNow >= 18){
		partOfDay = "õhtu";
	}
	return partOfDay;
}

module.exports = {dateETformatted: dateETformatted, timeETformatted: timeETformatted, monthsET: monthNamesET, timeOfDayET: timeOfDayET, dateENformatted: dateENformatted, dateENShort: dateENShort, timeENformatted: timeENformatted, monthsEN: monthNamesEN};
