var G = createjs.Graphics;

class Decorator {

  constructor(graphics){
    this.g = graphics;
  }

  decorate(command) {
    for (var label in command) {
      switch (label) {
        case 'beginStroke':
          this.g.beginStroke(command[label].style);
          break;
        case 'setStrokeDash':
          this.g.setStrokeDash(command[label].segments);
          break;
        case 'drawRect':
          this.g.drawRect(command[label].x, command[label].y, command[label].w, command[label].h);
          break;
        case 'moveTo':
          this.g.moveTo(command[label].x, command[label].y);
          break;
        case 'lineTo':
          this.g.lineTo(command[label].x, command[label].y);
          break;
        default:
          console.log('not curated: ', label);
          break;
      }
    }
  }
}

export default Decorator;
