const date = new Date();
var currentDate;
var lastSavedDate;
var workedToday;
var workedTotal;
let houresPerDayOfCruise = 20.8;
var bar1 = new ldBar("#myItem1");
// https://www.e-hoi.ch/kreuzfahrten-weltreise/80561/artania-phoenix-reisen-genua-italien-hamburg-deutschland.html?source=search#route
var ziele = ["Hamburg", "Seetag", "Seetag", "Seetag", "Lissabon", "Seetag", "Funchal", "Seetag", "Seetag", "Seetag", "Seetag", "Seetag", "Seetag", "Bridgetown", "St. George", "Seetag", "Oranjestad", "Willemstad", "Santa Marta", "Cartagena", "San Blas Inseln", "Puerto Limón", "Puerto Limón", "Cristobal / Colón", "Cristobal / Colón", "Panamal Kanal", "Panamal Kanal", "Puerto Quepos", "Puntarenas","San Juan del Sur", "Puntarenas"]

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
	if (workedTotal > 0) {
		document.getElementById("savedTotal").innerHTML = (workedTotal / houresPerDayOfCruise).toFixed(2);
	} else {
		document.getElementById("savedTotal").innerHTML = "0";
	}
	if (workedToday > 0) {
		document.getElementById("Workedtoday").innerHTML = "Heute " + workedToday + " Stunden gearbeitet";
	} else {
		document.getElementById("Workedtoday").innerHTML = "Heute noch nichts erfasst";
	}

	document.getElementById("nextDestination").innerHTML = "Nächstes Ziel: " + ziele[Math.floor(workedTotal / houresPerDayOfCruise)]

	document.getElementById("bg-image").style.backgroundImage = "url('ziele/" + (Math.floor(workedTotal / houresPerDayOfCruise) + 1) + ".jpg')";

	bar1.set(100 / 22 * (workedTotal % houresPerDayOfCruise));
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