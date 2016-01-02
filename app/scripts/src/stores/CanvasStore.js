import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var toUpdate, color='purple', size='10';

var CanvasStore = _.assign({}, EventEmmitter.prototype, {

  getShapesToUpdate: function(){
    return toUpdate;
  },
  
  getPencilSize: function(){
    return size;
  },
  
  getPencilColor: function(){
    return color;
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
      case Constants.UPDATE_STAGE:
        toUpdate = action.data;
        break;
      case Constants.CHANGE_PENCIL_COLOR:
        color = action.color;
        break;
      case Constants.CHANGE_PENCIL_SIZE:
        size = action.size;
        break;
    }

    CanvasStore.emitChange();
  }),



});



export default CanvasStore;
