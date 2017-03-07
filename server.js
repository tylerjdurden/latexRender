var fs = require('fs');
var renderLatex = require('./renderLatex.js');
var express = require('express');
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
	res.setHeader('Content-Type', 'image/svg+xml');
	// http://stackoverflow.com/a/17008027/5415895
	renderLatex.tex2svg(req.query.input, function(s){
		res.send(s);
	});
});

// Run server.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});