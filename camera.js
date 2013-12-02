/*
	Dependencies
*/
var	fs = require('fs'),
		http = require('http'),
		RaspiCam = require("raspicam");

var opts = {
	mode : 'photo',
	output : './photos/vkboom.jpg'
}
var camera = new RaspiCam(opts);

var server = http.createServer(function(req, res) {

	camera.start();
	camera.on("read", function(err, filename){ 
		var img = fs.readFileSync('./photos/vkboom.jpg');
		res.writeHead(200, {'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
	});


}).listen(8080);


var exit = function() {
	process.exit();
}

process.on('SIGINT', exit);
