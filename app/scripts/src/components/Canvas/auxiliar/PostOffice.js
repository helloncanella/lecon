import SocketActions from '../../../actions/SocketActions';

var self;

class PostOffice {
  
  constructor(stage){
    this.stage = stage;
    self = this;
  }
  
  dispatch(shapes, instruction){
    
    let toBroadcast = [];		
 		
    let shapeData;		
    
    if (!(shapes instanceof Array)) {		
     shapes = [shapes];		
    }		
    
    shapes.forEach(function(shape) {		
     shapeData = {		
       name: shape.name,		
       id: shape.id,		
       bounds: shape.getBounds(),		
       points: shape.points,		
       x: shape.x,		
       y: shape.y,		
       commands: shape.commands		
     };		
    
     toBroadcast.push(shapeData);		
    });		
    
    SocketActions.broadcast(toBroadcast, instruction);
  }
}




export default PostOffice; 