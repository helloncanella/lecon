import React from 'react';
import Shape from './auxiliar/Shape';

var self,  selection;

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

        shape = new Shape();
        shape.x = e.offsetX;
        shape.y = e.offsetY;
        shape.points = [];

        self.stage.addChild(shape);

        shape.points.push({x:shape.x, y:shape.y});

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
            shape.name = 'selection';
            shape.graphics.clear();
            shape.graphics
                .beginStroke('black')
                .setStrokeDash([10, 2], 0)
                .drawRect(0,0,distance.x, distance.y);
            shape.width = distance.x;
            shape.height = distance.y;

            //removing the last element
            if(shape.points[1]){
              shape.points.splice(1,1);
            }
            shape.points.push({x:(shape.x+distance.x), y:(shape.y+distance.y)});

          } else {
            self.cancelSelection();
            self.processes.drawing = true;
            if (!self.processes.drawingStarted) {
              shape.name = 'stroke';
              shape.graphics.beginStroke('red').moveTo(0, 0);
              self.processes.drawingStarted = true;
            } else {
              shape.graphics.lineTo(distance.x, distance.y);
              shape.points.push({x:(distance.x+shape.x), y:(distance.y+shape.y)});
            }
          }
          self.stage.update();
        }
      },
      mouseup: function() {
        shape.setAABB();
        self.restartProcesses();
        let region = shape.getBounds();
        if(shape.name == 'selection'){
          let region = shape.getBounds();
          let children = self.stage.children;
          let selected = [];

          let selection ={
            start:{x:region.x,y:region.y},
            end:{x:(region.x+region.width),y:(region.y+region.height)}
          };

          children.forEach(function(child){
            if(child.name !== 'selection'){
              let bounds = child.getBounds();
              let childStart = {
                x: bounds.x,
                y: bounds.y
              };
              let childEnd = {
                x: bounds.x+bounds.width,
                y: bounds.y+bounds.height
              };

              let childStartXIsInside = (selection.start.x < childStart.x) && (childStart.x < selection.end.x);
              let childStartYIsInside = (selection.start.y < childStart.y) && (childStart.y < selection.end.y);

              let childEndXIsInside = (selection.start.x < childEnd.x) && (childEnd.x < selection.end.x);
              let childEndYIsInside = (selection.start.y < childEnd.y) && (childEnd.y < selection.end.y);

              let childStartIsInside = childStartXIsInside && childStartYIsInside;
              let childEndIsInside = childEndXIsInside && childEndYIsInside;


              let childIsInside = childStartIsInside && childEndIsInside;


              if(childIsInside){
                selected.push(child);
              }
            }
          });



        }
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
