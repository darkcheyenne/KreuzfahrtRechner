const date = new Date();
var currentDate;
var lastSavedDate;
var workedToday;
var workedTotal;
let houresPerDayOfCruise = 20.8;
var bar1 = new ldBar("#myItem1");
// https://www.e-hoi.ch/kreuzfahrten-weltreise/80561/artania-phoenix-reisen-genua-italien-hamburg-deutschland.html?source=search#route
var ziele = ["Hamburg", "Seetag", "Seetag", "Seetag", "Lissabon", "Seetag", "Funchal", "Seetag", "Seetag", "Seetag", "Seetag", "Seetag", "Seetag", "Bridgetown", "St. George", "Seetag", "Oranjestad", "Willemstad", "Santa Marta", "Cartagena", "San Blas Inseln", "Puerto Limón", "Puerto Limón", "Cristobal / Colón", "Cristobal / Colón", "Panamal Kanal", "Panamal Kanal", "Puerto Quepos", "Puntarenas","San Juan del Sur", "Seetag", "Huatulco","Acapulco","Seetag","Puerto Vallarta","Cabo San Lucas","Seetag","San Diego","San Diego","Seetag","San Francisco","San Francisco","San Francisco","Seetag","Seetag","Seetag","Seetag","Seetag","Hilo","Kahului","Honolulu","Seetag","Nawiliwili","Seetag","Seetag","Seetag","Seetag","Seetag","Majuro"]

workedToday = localStorage.getItem('workedToday');
workedTotal = localStorage.getItem('workedTotal');

currentDate = "" + date.getDate() + date.getMonth() + date.getFullYear();
lastSavedDate = localStorage.getItem('lastSavedDate');

if (!workedToday) {
	workedToday = 0;
}
if (!workedTotal) {
	workedTotal = 0;
}
if (!lastSavedDate) {
	lastSavedDate = currentDate;
	localStorage.setItem('lastSavedDate', currentDate);
}

if (lastSavedDate != currentDate) {
	workedToday = 0;
	localStorage.setItem('lastSavedDate', currentDate);
}

updateText();

function add() {
	workedToday = parseInt(workedToday) + 1;
	workedTotal = parseInt(workedTotal) + 1;

	localStorage.setItem('workedToday', workedToday);
	localStorage.setItem('workedTotal', workedTotal);

	updateText();
}

function updateText() {
	if (workedToday > 0) {
		document.getElementById("Workedtoday").innerHTML = "Heute " + workedToday + " Stunden gearbeitet";
	} else {
		document.getElementById("Workedtoday").innerHTML = "Heute noch nichts erfasst";
	}

	document.getElementById("nextDestination").innerHTML = "Nächstes Ziel: " + ziele[Math.floor(workedTotal / houresPerDayOfCruise)]

	document.getElementById("bg-image").style.backgroundImage = "url('ziele/" + (Math.floor(workedTotal / houresPerDayOfCruise) + 1) + ".jpg')";

	bar1.set(100 / 22 * (workedTotal % houresPerDayOfCruise));
}

function menuClickTurtle() {
	document.getElementById("myItem1").style.display = "none";
	document.getElementById("nextDestination").style.display = "none";
	document.getElementById("Workedtoday").style.display = "none";
	document.getElementById("addButton").style.display = "none";
	document.getElementById("investipanzi").style.display = "block";
	document.getElementById("investipanzi2").style.display = "block";
	document.getElementById("bg-image").style.backgroundImage = null;
	document.getElementById("investipanzi2").innerHTML = "Investipanzi bekommt aus der Arbeit von heute <b><u>jeden Monat</u></b> <br/><br/>" + Math.round(workedToday * 23 * 0.05 / 12 ) +" CHF und " + (workedToday * 23 *0.05 / 12 ).toString().split(".")[1].substring(0,2) + " Rappen";
}

function menuClickCruise() {
	document.getElementById("myItem1").style.display = "block";
	document.getElementById("nextDestination").style.display = "block";
	document.getElementById("Workedtoday").style.display = "block";
	document.getElementById("addButton").style.display = "block";
	document.getElementById("investipanzi").style.display = "none";
	document.getElementById("investipanzi2").style.display = "none";
	updateText();
}

function decimalAdjust(type, value, exp) {
	type = String(type);
	if (!["round", "floor", "ceil"].includes(type)) {
		throw new TypeError(
			"The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
		);
	}
	exp = Number(exp);
	value = Number(value);
	if (exp % 1 !== 0 || Number.isNaN(value)) {
		return NaN;
	} else if (exp === 0) {
		return Math[type](value);
	}
	const [magnitude, exponent = 0] = value.toString().split("e");
	const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
	// Shift back
	const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
	return Number(`${newMagnitude}e${+newExponent + exp}`);
}