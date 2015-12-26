import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var dataToBroadcast;

var SocketStore = _.assign({}, EventEmmitter.prototype, {

  getDataToBroadcast: function(){
    return dataToBroadcast;
  },

  emitChange: function(argument) {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  dispatchToken: AppDispatcher.register(function(action) {

    switch (action.type) {
      case Constants.BROADCAST:
        dataToBroadcast = action.data;
        break;
    }

    SocketStore.emitChange();
  }),



});



export default SocketStore;
