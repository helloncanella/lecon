import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var toUpdate;

var CanvasStore = _.assign({}, EventEmmitter.prototype, {

  getShapesToUpdate: function(){
    return toUpdate;
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
    }

    CanvasStore.emitChange();
  }),



});



export default CanvasStore;
