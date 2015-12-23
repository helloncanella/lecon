import React from 'react';

var self,
  selection;

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    self = this;

    this.restartProcesses();
  }

  restartProcesses () {
    this.processes = {
      mousedown: false,
      selecting: false,
      drawing: false,
      drawingStarted: false
    };
  }

  cancelSelection () {
    clearTimeout(selection);
    self.processes.selecting = false;
    self.processes.drawing = true;
  }

  componentDidMount () {

    let shape;

    this.stage = new createjs.Stage(this.props.id);

    $('canvas#' + this.props.id).on({
      mousedown: function(e) {
        self.processes.mousedown = true;

        shape = new createjs.Shape();
        shape.x = e.offsetX;
        shape.y = e.offsetY;

        self.stage.addChild(shape);

        selection = setTimeout(function() {
          self.processes.selecting = true;
        }, 200);

      },
      mousemove: function(e) {
        if (self.processes.mousedown) {

          let distance = {
            x: e.offsetX - shape.x,
            y: e.offsetY - shape.y
          };

          if (self.processes.selecting) {
            shape.graphics.clear();
            shape.graphics
                .beginStroke('black')
                .setStrokeDash([10, 2], 0)
                .drawRect(0,0,distance.x, distance.y);
          } else {
            self.cancelSelection();
            self.processes.drawing = true;
            if (!self.processes.drawingStarted) {
              shape.graphics.beginStroke('red').moveTo(0, 0);
              self.processes.drawingStarted = true;
            } else {
              shape.graphics.lineTo(distance.x, distance.y);
            }
          }

          self.stage.update();
        }
      },
      mouseup: function() {
        self.restartProcesses();
      }
    });
  }

  render () {
    return(
      <canvas id={this.props.id} width={this.props.width} height={this.props.height}></canvas>
    );
  }

}

export default Canvas;
