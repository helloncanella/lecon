import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var PhoneActions = {
  updateStage: function(user) {
    let action = {
      type: Constants.INSERT_NEW_USER,
      data: {
        user: user,
      }
    };
    AppDispatcher.handleAction(action);
  },
  
};

export default PhoneActions;
