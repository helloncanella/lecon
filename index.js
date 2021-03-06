var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

var users = [];

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

io.on('connection', function(socket) {
  

  socket.on('shape update', function(data) {
    socket.broadcast.emit('shape', data);
  });
  

});

server.listen(process.env.PORT || 3000);


var livereload = require('livereload');
var srv = livereload.createServer();
srv.watch(__dirname + "/app");


