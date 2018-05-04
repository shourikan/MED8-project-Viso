function handleFile(fileToRead) {
	var reader = new FileReader();
	var file = new File([fileToRead], 'data.tsv');
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(file);
}

function test(url){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			//alert(xhr.responseText);
			handleFile(xhr.responseText);
		}
	}
	xhr.open('GET', url, true);
	xhr.send(null);

}

function loadHandler(event) {
	var file = event.target.result;
	processData(file);             
}

function processData(file) {
    var allTextLines = file.split(/\r\n|\n/);
	var lines = [];
	var rows = [[],[],[]];
	allTextLines.shift();
    while (allTextLines.length) {
		var line = allTextLines.shift().split('\t');
		for(var i=0; i<2; i++)
			line[i] = Number(line[i]);
		line[3] = Number(line[3]);
		lines.push(line);
    }
	//console.log(lines);
	//drawOutput(lines);

	//Call D3.js drawing
	drawChart(lines);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
}
