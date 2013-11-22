/**
 * Module dependencies.
 */

var express = require('express'), http = require('http'), path = require('path'), helmet = require('helmet');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 5060);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hjs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')({
		src : __dirname + '/public'
	}));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

global.auth = express.basicAuth(function(user, pass, callback) {
	var result = (user === 'admin' && pass === 'dummy');
	callback(null/* error */, result);
});

var routes = require('./routes')(app);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

var socket = require('socket.io');
global.io = socket.listen(server, {
	log : false
});

global.io.configure(function() {
	io.set('log level', 0);
});

io.sockets.on('connection', function(socket) {
	socket.on('imgid', function(data) {
		socket.broadcast.emit('imgid', data);
	});
	this.setMaxListeners(0);
});
