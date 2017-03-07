var mjAPI = require("mathjax-node");

function tex2svg(texString) {
	console.log('help');
	console.log(texString);
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

	mjAPI.typeset({
		math: texString,
		format: "TeX",
		svg: true,
		width: 5
	}, function (data) {
		if (!data.errors) {
			/*
			For some reason I can only view the image in the browser.
			I cannot see it with Ubuntu's image viewer.
			*/
			return data.svg;
		}
		else
			console.error(data.errors);
	});

}

module.exports.tex2svg = tex2svg;