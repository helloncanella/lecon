import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

var CanvasAction = {
  updateStage: function(data) {
    let action = {
      type: Constants.UPDATE_STAGE,
      data: {
        shapes: data.shapes,
        instruction: data.instruction
      }
    };
    AppDispatcher.handleAction(action);
  },
  changePencilSize: function(size){
    let action = {
      type: Constants.CHANGE_PENCIL_SIZE,
      size: size  
    }
    AppDispatcher.handleAction(action); 
  },
  changePencilColor: function(color){
    let action = {
      type:Constants.CHANGE_PENCIL_COLOR,
      color: color  
    }
    AppDispatcher.handleAction(action); 
  },
};

export default CanvasAction;
