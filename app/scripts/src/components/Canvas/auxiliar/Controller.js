import SocketActions from '../../../actions/SocketActions';

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
      //SocketActions.broadcast(shapes, 'remove');

      var selection = self.stage.getChildByName('selection');
      self.stage.removeChild(selection);
      
      shapes.forEach(function(shape){
        self.stage.removeChild(shape);
      });
      
      self.stage.update(); 
    }
    
    function moveBack(){
      self.stage.removeLastChild();
    }
    
    function moveForward(){
      self.stage.addLastRemovedChild();
    }
    
  } 
  
  
}



export default Controller;

