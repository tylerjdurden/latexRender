var mjAPI = require("mathjax-node");
var fs = require('fs');

/*
TODO:
1. Create a module for converting LaTeX to SVG
2. Create a webserver with a url endpoint that takes a TeX string as a GET request and returns an SVG string.
3. Something something telegram.
*/

mjAPI.config({
	MathJax: {
		SVG : {
			scale: 240,
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
console.log(yourMath);
mjAPI.typeset({
	math: yourMath,
	format: "TeX",
	svg: true,
	width: 5
}, function (data) {
	if (!data.errors) {
		/*
		For some reason I can only view the image in the browser.
		I cannot see it with Ubuntu's image viewer.
		*/
		fs.writeFile("data.svg", data.svg, fsWriteCallback);
	}
});
