const fs = require('fs');
const renderLatex = require('./renderLatex.js');
const express = require('express');
const svg2png = require("svg2png");

var app = express();

// Default landing page is index.html.
app.use("/", express.static(__dirname + '/static'));

/*
This takes a querystring input=<tex string> and returns an png rendering of that input.
*/
app.get('/render', function (req, res) {
	res.setHeader('Content-Type', 'image/png');
	// http://stackoverflow.com/a/17008027/5415895
	renderLatex.tex2svg(req.query.input, function(s){
		// Transform the svg to png.
		// TODO: Dynamic height.
		svg2png(s, {width: 300, height: 400}).then(buffer => res.send(buffer)).catch(e => console.error(e));
	});
});

// Run server.
app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!');
});