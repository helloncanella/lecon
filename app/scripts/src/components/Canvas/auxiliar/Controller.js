import SocketActions from '../../../actions/SocketActions';
import PostOffice from './PostOffice';

var self;

class Controller {
  
  constructor(stage){
    this.stage = stage;
    this.stepsBack =  0; //liquid result (stepsBack - stepForward) of number of times ctrz-l was called.
    self = this;
  }
  
  activate(){
    
    $(window).on({
      keydown: function(e){
        var keyCode = e.keyCode;    
        
        if(e.ctrlKey){
          switch (keyCode) {
            case 90://z
              moveBack(); //increase the number of children to remove
              break;
              
            case 89://y
              moveForward(); //decrease the number of children to remove
              break;
          }            
        }
        
        else{
          switch (keyCode) {
            
            case 46: //delete
              var selected = self.stage.selectedShapes;
              
              if(selected.length>0){
                deleteShapes(selected);
              }
              break;
          }
        }
      },
    })
    
    function deleteShapes(shapes){
      /*
        Remotion's broadcast needs to be called befor state.removeChild.
        Otherwise shapes'id value will be transmitted as -1.  
      */
      
      var selection = self.stage.getChildByName('selection');
      PostOffice.dispatch(selection, 'remove');
      self.stage.removeChild(selection);
      
      
      PostOffice.dispatch(shapes, 'remove');
      shapes.forEach(function(shape){
        self.stage.removeChild(shape);
      });
      
      self.stage.update(); 
    }
    
    function moveBack(){
      var lastChild = self.stage.removeLastChild();
      PostOffice.dispatch(lastChild, 'remove');
    }
    
    function moveForward(){
      var removedLastChild = self.stage.addLastRemovedChild();
      PostOffice.dispatch(removedLastChild, 'remove');
    }
    
  } 
  
  
}



export default Controller;

