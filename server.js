var fs = require('fs');
var renderLatex = require('./renderLatex.js');

/*
TODO:
1. Create a module for converting LaTeX to SVG
2. Create a webserver with a url endpoint that takes a TeX string as a GET request and returns an SVG string.
3. Something something telegram.
*/


function fsWriteCallback(err){
	if (err){
		return console.log(err);
	}
	console.log('File successfully written.');
}
var input = String.raw`\frac{1}{e}`;
var str = renderLatex.tex2svg(input);
fs.writeFile("data.svg", str, fsWriteCallback);
