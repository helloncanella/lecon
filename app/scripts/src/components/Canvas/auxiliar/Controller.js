import SocketActions from '../../../actions/SocketActions';

var Controller = {
  activate: function(stage){
    $(window).on({
      keydown: function(e){
        var keyCode = e.keyCode;
        
        if(e.ctrlKey){
          switch (keyCode) {
            case 90://z
              moveBack();
              break;
              
            case 89://y
              moveForward();
              break;
          }            
        }
        
        else{
          switch (keyCode) {
            
            case 46: //delete
              var selected = stage.selectedShapes;
              
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

      var selection = stage.getChildByName('selection');
      stage.removeChild(selection);
      
      shapes.forEach(function(shape){
        stage.removeChild(shape);
      });
      
      stage.update(); 
    }
    
    function moveBack(){
      console.log('moveBack');
    }
    
    function moveForward(){
      console.log('moveForward');
    }
  
    
  }  
}

export default Controller;

