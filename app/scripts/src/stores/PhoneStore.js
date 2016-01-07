import _ from 'lodash';
import EventEmmitter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var listOfUsers = [];

var PhoneStore = _.assign({}, EventEmmitter.prototype, {

  getListOfUsers: function(){
    return listOfUsers;
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
      case Constants.INSERT_NEW_USER:
        let user= action.data.user;
        listOfUsers.push(user);
        
        break;
    }

    PhoneStore.emitChange();
  }),



});



export default PhoneStore;
