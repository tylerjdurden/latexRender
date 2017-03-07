const fs = require('fs');
const renderLatex = require('./renderLatex.js');
const express = require('express');
const svg2png = require("svg2png");
var app = express();

/*
TODO: telegram, error handling.
*/

// Test the rendering to svg.
var input = String.raw`\frac{1}{e}`;
renderLatex.tex2svg(input, function(str){
	fs.writeFile("data.svg", str, function (err){
		if (err){
			console.log(err);
		}
		console.log('File successfully written.');
	});
});

/*
This takes a querystring input=<tex string> and returns an svg rendering of that input.
*/
app.get('/', function (req, res) {
	res.setHeader('Content-Type', 'image/png');
	// http://stackoverflow.com/a/17008027/5415895
	renderLatex.tex2svg(req.query.input, function(s){
		svg2png(s, {width: 300, height: 400}).then(buffer => res.send(buffer)).catch(e => console.error(e));
	});
});

// Run server.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});