import SocketStore from '../../stores/SocketStore';
import SocketIO from 'socket.io-client';

import CanvasActions from '../../actions/CanvasActions';
import PhoneActions from '../../actions/PhoneActions';

var socketClient = SocketIO();

console.log(SocketStore);

var Socket = {
  change: function(){
    let toBroadcast = SocketStore.getDataToBroadcast();
    console.log(toBroadcast.socketEvent);
    socketClient.emit(toBroadcast.socketEvent, toBroadcast.data);
  }
};

socketClient.on('shape', function(data){
  CanvasActions.updateStage(data);
});



SocketStore.addChangeListener(Socket.change);
