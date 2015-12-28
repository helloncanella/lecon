var G = createjs.Graphics;

class CommandFactory {
  get(commandData) {
    let command;
    for (var label in commandData) {
      switch (label) {
        case 'beginStroke':
          command = new G.Stroke(commandData[label].style);
          break;
        case 'setStrokeDash':
          command = new G.StrokeDash(commandData[label].segments);
          break;
        case 'drawRect':
          command = new G.Rect(commandData[label].x, commandData[label].y, commandData[label].w, commandData[label].h);
          break;
        case 'moveTo':
          command = new G.MoveTo(commandData[label].x, commandData[label].y);
          break;
        case 'lineTo':
          command = new G.LineTo(commandData[label].x, commandData[label].y);
          break;
        default:
          console.log('not curated: ', label);
          break;
      }
    }
    return command;
  }
}

export default CommandFactory;
