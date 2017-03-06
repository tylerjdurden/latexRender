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

var yourMath = '\frac{1}{e}';
mjAPI.typeset({
	math: yourMath,
	format: "TeX",
	svg: true
}, function (data) {
	if (!data.errors) {
		fs.writeFile("data.svg", data.svg);
	}
});