import SocketActions from '../../../actions/SocketActions';

var PostOffice = {
  
  packShapes: function (shapes){
    
    let toBroadcast = [];

    let shapeData;

    if (!(shapes instanceof Array)) {
      shapes = [shapes];
    }

    shapes.forEach(function(shape) {
      console.log(shape.graphics);
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
    
    
    
    return toBroadcast; 
  },
  
  dispatch: function(shapes, instruction) {
    
    let toBroadcast = this.packShapes(shapes);

    SocketActions.broadcast(toBroadcast, instruction);

  },
}

export default PostOffice; 