// a simple TeX-input example
var mjAPI = require("mathjax-node");
var fs = require('fs');
var jsdom = require("jsdom").jsdom;

mjAPI.config({
	MathJax: {
		SVG : {
			scale: 120,
			font : "STIX-Web",
			linebreaks: { automatic: true },
			tex2jax: { 
				inlineMath: [['$','$'], ['\\(','\\)']],
			}
		}
	}
});
mjAPI.start();

function fsWriteCallback(err){
	if (err){
		return console.log(err);
	}

	console.log('File successfully written.');
}

var yourMath = String.raw`\frac{1}{e}`;
mjAPI.typeset({
	math: yourMath,
	format: "TeX",
	svg: true
}, function (data) {
	if (!data.errors) {
		fs.writeFile("data.svg", data.svg, fsWriteCallback);
	}
});
