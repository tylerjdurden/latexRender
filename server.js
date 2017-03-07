var fs = require('fs');
var renderLatex = require('./renderLatex.js');
var express = require('express');
var app = express();

/*
TODO:
1. Create a module for converting LaTeX to SVG. DONE
2. Create a webserver with a url endpoint that takes a TeX string as a GET request and returns an SVG string. http://stackoverflow.com/a/17008027/5415895
3. Something something telegram.
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


// This returns an svg 1/e.
app.get('/', function (req, res) {
	res.setHeader('Content-Type', 'image/svg+xml');
	renderLatex.tex2svg(input, function(s){
		res.send(s);
	});
});

// Run server.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});