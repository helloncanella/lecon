var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static(__dirname+'/app'));

app.get('/', function(req,res){
  res.sendFile('index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


server.listen(process.env.PORT || 3000);
