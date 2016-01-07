import SocketStore from '../../stores/SocketStore';
import SocketIO from 'socket.io-client';

import CanvasActions from '../../actions/CanvasActions';
import PhoneActions from '../../actions/PhoneActions';

var socketClient = SocketIO();

var Socket = {
  change: function(){
    let toBroadcast = SocketStore.getDataToBroadcast();
    socketClient.emit(toBroadcast.socketEvent, toBroadcast.data);
  }
};


socketClient.on('shape', function(data){
  CanvasActions.updateStage(data);
});

socketClient.on('new user', function(data){
  PhoneActions.insertNewUser(data);
});






SocketStore.addChangeListener(Socket.change);
