import SocketStore from '../../stores/SocketStore';
import SocketIO from 'socket.io-client';


var Socket = {
  change: function(){
    let toBroadcast = SocketStore.getDataToBroadcast();
    let socketClient = SocketIO();
    console.log(toBroadcast.data.shape);  
    socketClient.emit(toBroadcast.socketEvent, toBroadcast.data.shape.graphics);
    console.log(toBroadcast.data.shape.graphics);
  }
};

SocketStore.addChangeListener(Socket.change);
