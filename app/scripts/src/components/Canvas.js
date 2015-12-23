import React from 'react';

var self;

class Canvas extends React.Component {

  constructor(props){
    super(props);
    self = this;
  }

  componentDidMount() {

    let shape;

    this.stage = new createjs.Stage(this.props.id);

    $('canvas#' + this.props.id).on({
      mousedown: function(e) {
        self.isDrawing = true;

        shape = new createjs.Shape();
        shape.x = e.offsetX;
        shape.y = e.offsetY;

        self.stage.addChild(shape);

        shape.graphics.beginStroke('red').moveTo(0, 0);
        self.stage.update();

      },
      mousemove: function(e) {
        if (self.isDrawing) {
          let distance = {
            x: e.offsetX-shape.x,
            y: e.offsetY-shape.y
          };

          shape.graphics.lineTo(distance.x, distance.y);
          self.stage.update();
        }
      },
      mouseup: function() {
        self.isDrawing = false;
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
