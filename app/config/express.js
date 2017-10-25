var express = require('express');
var http = require('http');

var app = express();

module.exports = function(app, config) {

    //app object implements the server
    //Middlewares are loaded
	app.use(function(req, res, next) {
        console.log('Request from' + req.ip);
        next();
    });
    
    //sets the port to 3000
    app.set('port', process.env.PORT || 3000);
    
    //responds to get requests with the url
	app.get('/', function(req, res) {
		res.send('Hello World!');
	});
    
    //404 and 500 error handler
	app.use(express.static(config.root + '/public'));
		app.use(function(req, res) {
			res.type('text/plan');
			res.status(404);
			res.send('404 Not Found');
		});
		app.use(function(err, req, res, next) {
			console.error(err.stack);
			res.type('text/plan');
			res.status(500);
			res.send('500 Server Error');
		});
	logger.log("Starting application");
    
    //tells server to listen on that port
	http.createServer(app).listen(3000, function() {
		console.log('Express server listening on port ' + 3000);
	});
};
