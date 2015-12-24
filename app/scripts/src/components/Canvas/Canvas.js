import React from 'react';
import Shape from './auxiliar/Shape';

var self,  selection, selectionRegion, selectedShapes = [];

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
      drawingStarted: false,
      movingSelection: false,
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

        // verifying if there is a selection container.
        let selector = self.stage.getChildByName('selection');

        if(selector){
          if(isInsideRegion({x:e.offsetX, y:e.offsetY})){

          }else{
            self.stage.removeChild(selector);
            self.stage.update();
            selectedShapes = [];
          }
        }else{
          shape = new Shape();
          shape.x = e.offsetX;
          shape.y = e.offsetY;
          shape.points = [];

          self.stage.addChild(shape);

          shape.points.push({x: shape.x, y: shape.y});

          selection = setTimeout(function() {
            self.processes.selecting = true;
          }, 200);
        }

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
            shape.graphics.beginStroke('black').setStrokeDash([
              10, 2,
            ], 0).drawRect(0, 0, distance.x, distance.y);
            shape.width = distance.x;
            shape.height = distance.y;

            //removing the last element
            if (shape.points[1]) {shape.points.splice(1, 1);}
            shape.points.push({
              x: (shape.x + distance.x),
              y: (shape.y + distance.y)
            });

          }else if (self.processes.movingSelection){

          }
          else {
            self.cancelSelection();
            self.processes.drawing = true;
            if (!self.processes.drawingStarted) {
              shape.name = 'stroke';
              shape.graphics.beginStroke('red').moveTo(0, 0);
              self.processes.drawingStarted = true;
            } else {
              shape.graphics.lineTo(distance.x, distance.y);
              shape.points.push({
                x: (distance.x + shape.x),
                y: (distance.y + shape.y)
              });
            }
          }
          self.stage.update();
        }
      },
      mouseup: function() {
        self.restartProcesses();

        if(shape.points.length>1){
          shape.setAABB();
        }

        let region = shape.getBounds();
        if (shape.name == 'selection') {
          let region = shape.getBounds();
          let children = self.stage.children;

          selectionRegion = {
            start: {
              x: region.x,
              y: region.y
            },
            end: {
              x: (region.x + region.width),
              y: (region.y + region.height)
            }
          };

          children.forEach(function(child) {
            if (child.name !== 'selection') {
              let bounds = child.getBounds();
              let childStart = {
                x: bounds.x,
                y: bounds.y
              };
              let childEnd = {
                x: (bounds.x + bounds.width),
                y: (bounds.y + bounds.height)
              };

              let childStartIsInside = isInsideRegion(childStart);
              let childEndIsInside = isInsideRegion(childEnd);

              let childIsInside = childStartIsInside && childEndIsInside;

              if (childIsInside) {selectedShapes.push(child);}
            }
          });



        }
      }
    });


    function isInsideRegion(point) {

      var pointIsInside = false;

      if(selectionRegion){
        let pointXIsInside = (selectionRegion.start.x < point.x) && (point.x < selectionRegion.end.x);
        let pointYIsInside = (selectionRegion.start.y < point.y) && (point.y < selectionRegion.end.y);

        pointIsInside = pointXIsInside && pointYIsInside;

      }

      return pointIsInside;

    }
  }

  render () {
    return(
      <canvas id={this.props.id} width={this.props.width} height={this.props.height}></canvas>
    );
  }

}

export default Canvas;
