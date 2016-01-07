import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var SocketActions = {
  broadcast: function(shapes, instruction) {
    let action = {
      type: Constants.BROADCAST,
      data: {
        socketEvent: 'shape update',
        data: {
          shapes: shapes,
          instruction: instruction
        }
      }
    };
    AppDispatcher.handleAction(action);
  },
  
   
};

export default SocketActions;
