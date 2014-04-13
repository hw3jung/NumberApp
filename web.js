//EXPRESS


var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , url = require('url')
  ,	fs = require('fs')
  , bodyParser = require('body-parser');

var s;
var score = 0;

app.engine('html', function(filename, options, callback){
  fs.readFile(filename, 'utf8', function(err, str){
    if (err) return callback(err);
    callback(null, str);
  });
});

app.use(bodyParser());

app.get('/chat', function(req,res) {
	res.render(__dirname + '/public/chatclient.html', {title:'Chat'});
});

app.post('/hack', function(req, res){
	var message = req.body.body;
	console.log("test1");
	if (!isNaN(message)){
	console.log("test2");
		if (message == score + 1)
			score ++;
		else if (message != score)
			score --;

	console.log("test3");

	}

	console.log("test4");
    	
    var jsonObject = {
		    "score" : score,
		    "message" : message
		} ;
	s.emit(
		'test',
		jsonObject
	);
	res.end();
});

var port = process.env.PORT || 8080;
if (port == 8080) {
	app.set('view opinions', {layout: false});
	app.use(express.static(__dirname + '/public'));
}
server.listen(port);
console.log('Server running');


io.sockets.on('connection', function(socket){
	s = socket;
	console.log("Connection " + socket.id + " accepted.");
	socket.emit('test', 'hi');

	socket.on('disconnect', function() {
		console.log("Connection " + socket.id + " terminated.");
	});

});

