import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var CanvasAction = {
  updateStage: function(data) {
    let action = {
      type: Constants.UPDATE_STAGE,
      data: _.assign({}, {
        shapes: data.shapes,
        instruction: data.instruction
      })
    };
    AppDispatcher.handleAction(action);
  }
};

export default CanvasAction;
