import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var PhoneActions = {
  updateUsersList: function(users){
    let action = {
      type:Constants.UPDATE_USERS_LIST,
      users: users  
    }
    AppDispatcher.handleAction(action); 
  },
};

export default PhoneActions;
