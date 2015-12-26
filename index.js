var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

io.on('connection', function(socket) {
  socket.on('shape update', function(shape) {
    console.log(shape);
    // socket.broadcast.emit('shape', shape);
  });
});

server.listen(process.env.PORT || 3000);
