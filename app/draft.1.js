import SocketActions from '../../../actions/SocketActions';

class Controller {
  
  constructor(stage){
    this.stage = stage;
    this.logPosition = stage.log.length - 1; 
    this.stepsBack =  0; //liquid result (stepsBack - stepForward) of number of times ctrz-l was called.
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
              var selected = this.stage.selectedShapes;
              
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

      var selection = this.stage.getChildByName('selection');
      this.stage.removeChild(selection);
      
      shapes.forEach(function(shape){
        this.stage.removeChild(shape);
      });
      
      this.stage.update(); 
    }
    
    function moveBack(){
      
      this.stepsBack++;
      this.stage.stepsBack = this.stepsBack;
      
      this.logPosition--;
      
      this.stage.loadLogItem(this.logPosition); //update the stage, without altering log
    
    }
    
    
    function moveForward(){
      if(this.stepsBack > 0){
        
        this.stepsBack--;
        this.stage.stepsBack = this.stepsBack;
        
        this.logPosition++;
        
        this.stage.loadLogItem(this.logPosition);
      
        
      }
    }
  
    
  } 
  
  
}



export default Controller;

