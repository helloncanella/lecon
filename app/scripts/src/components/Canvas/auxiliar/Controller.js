import SocketActions from '../../../actions/SocketActions';
import PostOffice from './PostOffice';

var self;

class Controller {
  
  constructor(stage){
    this.stage = stage;
    this.stepsBack =  0; //liquid result (stepsBack - stepForward) of number of times ctrz-l was called.
    self = this;
    
    self.postOffice = new PostOffice(this.stage);
  }
  
  activate(){
    
    $(window).on({
      keydown: function(e){
        var keyCode = e.keyCode;    
        
        if(e.ctrlKey){
          switch (keyCode) {
            case 90://z
              self.moveBack(); //increase the number of children to remove
              break;
              
            case 89://y
              self.moveForward(); //decrease the number of children to remove
              break;
          }            
        }
        
        else{
          switch (keyCode) {
            
            case 46: //delete
              var selected = self.stage.selectedShapes;
              
              if(selected.length>0){
                self.deleteShapes(selected);
              }
              break;
          }
        }
      },
    })
    
    
    
  }
  
  deleteShapes(shapes){
    /*
      Remotion's broadcast needs to be called befor state.removeChild.
      Otherwise shapes'id value will be transmitted as -1.  
    */
    
    self.postOffice.dispatch(shapes, 'remove');
    shapes.forEach(function(shape){
      self.stage.removeChild(shape);
    });
    
    var selection = self.stage.getChildByName('selection');
    self.postOffice.dispatch(selection, 'remove');
    self.stage.removeChild(selection);
    
    self.stage.update(); 
  }
    
  moveBack() {
    var lastChild = self.stage.removeLastChild();
    self.postOffice.dispatch(lastChild, 'move back');
  }
  
  moveForward() {
    var removedLastChild = self.stage.addLastRemovedChild();
    self.postOffice.dispatch(removedLastChild, 'move forward');
  }
  
  
}



export default Controller;

