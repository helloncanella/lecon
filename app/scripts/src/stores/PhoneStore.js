import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var allUsers = [];

var PhoneStore = _.assign({}, EventEmmitter.prototype, {
  
  getAllUsers: function(){
    return allUsers;
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
      case Constants.UPDATE_USERS_LIST:
        allUsers = action.users;
        break;
    }

    PhoneStore.emitChange();
  }),



});



export default PhoneStore;
