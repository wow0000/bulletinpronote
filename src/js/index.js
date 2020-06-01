// wow - 2020

const cas = "ac-";
const url = 'https://000000.index-education.net/pronote/';
const endpoint = 'https://pronote.wowow.cloud/api/select';

function UI_lockLoginState(bool) {
	document.getElementById("alert-login").hidden = true;
	document.querySelector("#login-section .btn").disabled = bool;
}

function UI_section(name) {
	const sections = document.querySelectorAll("section")
	sections.forEach(function (sec) {
		sec.hidden = true;
	})
	document.getElementById(name).hidden = false;
}

function tryLogin() {
	UI_lockLoginState(true);
	document.getElementById("alert-login").hidden = true;

	let username = document.getElementById("exampleInputEmail1").value;
	let password = document.getElementById("exampleInputPassword1").value;

	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	const body = {
		req: ["reports"],
		username,
		password,
		cas,
		url,
	};

	const init = {
		method: 'POST',
		headers,
		body: JSON.stringify(body)
	}
	console.log(init);
	fetch(endpoint, init)
	.then((response) => {
		UI_lockLoginState(false);
		response.json().then(function (json) {
			console.log(json);
			if (json === {} || json.reports.status === false) {
				document.getElementById("alert-login").hidden = false;
				return;
			}
			UI_section("results-section")
			fillTable(json.reports.res)
		})
	})
	.catch((e) => {
		// error in e.message
	});
}

let table = [];
for (let i = 0; i < 3; ++i) {
	table[i] = new Tabulator("#table-bulletin" + i, {
		columns: [
			{title: "Matière", field: "name"},
			{title: "Moyenne", field: "average"},
			{title: "Rendu", field: "comment"},
			{title: "Moyenne de classe", field: "studentClassAverage"},
		]
	})
}

function fillTable(reports) {
	for (let i = 0; i < 3; ++i) {
		let sub = reports[i].subjects;
		for (let y = 0; y < sub.length; ++y) {
			sub[y].id = y;
		}
		table[i].setData(sub)
	}
}

