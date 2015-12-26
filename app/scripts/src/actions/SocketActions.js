import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var SocketActions = {
  updateShape: function(shape, instruction) {
    let action = {
      type: Constants.BROADCAST,
      data: _.assign({}, {
        socketEvent: 'shape update',
        data: {
          shape: shape,
          instruction: instruction
        }
      })
    };
    AppDispatcher.handleAction(action);
  }
};

export default SocketActions;
