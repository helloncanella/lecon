import React from 'react';
import Shape from './auxiliar/Shape';
import Decorator from './auxiliar/Decorator';
import Stage from './auxiliar/Stage';
import Controller from './auxiliar/Controller';
import PostOffice from './auxiliar/PostOffice';
import _ from 'lodash';

var self,
  selection,
  selectionRegion,
  startPoint,
  selector,
  shape,
  old = {};
  

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
      movingSelection: false
    };
    shape = null;
    old = {};
  }

  cancelSelection () {
    clearTimeout(selection);
    self.processes.selecting = false;
    self.processes.drawing = true;
  }
  

  componentWillReceiveProps (nextProps) {

    self.stage.update();
    
    let data = nextProps.toUpdate.shapes;

    if (data) {
      
      let instruction = nextProps.toUpdate.instruction;
      
      if (instruction == 'move back') {
        
        self.controller.moveBack();
      
      } else if (instruction == 'move forward') {
        
        self.controller.moveForward();
         
      } else {
        
        data.forEach(function(shapeData) {
  
          let id = shapeData.id;
          let index = (id-1);
          let child = self.stage.getChildAt(index);
  
          if (instruction == 'remove') {
            
            self.stage.children.forEach(function(child){
              if (child.id == id){
                self.stage.removeChild(child);  
              }
            });

          }
          
          else{
            if (!child) {
              shape = new Shape();
              shape.artist = new Decorator(shape.graphics);
              shape.id = id;
              self.stage.addChild(shape);
              console.log(shape.id);
            } else {
              shape = child;
            }
           
            for (var prop in shapeData) {
              if (shapeData.hasOwnProperty(prop)) {
                if (shapeData[prop]) {
                  if (prop == 'bounds') {
                    let bounds = shapeData.bounds;
                    shape.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
                  }
                  else if (prop == 'commands') {
                    if(shape.name=='selection'){
                      shape.graphics.clear();
                    }
                    var commands = shapeData.commands;
                    commands.forEach(decorateShape);
                  }
                  else{
                    shape[prop] = shapeData[prop];
                  }
                }
              }
            }
          }
        });

      }
      
    }

    self.stage.update();

    function decorateShape(command) {
      shape.artist.decorate(command);
    }

  }

  componentDidMount () {
    let g;
    
    this.stage = new Stage(this.props.id);
    
    var postOffice = new PostOffice(this.stage);
    
    /*activing keyController*/
    this.controller = new Controller(this.stage);
    this.controller.activate(); 

    
    $('canvas#' + this.props.id).on({
      mousedown: function(e) {
        self.processes.mousedown = true;

        startPoint = {
          x: e.offsetX,
          y: e.offsetY
        };

        // verifying if there is a selection container.
        selector = self.stage.getChildByName('selection');

        if (selector) {
          
          if (isInsideRegion({x: startPoint.x, y: startPoint.y})) {
            shape = selector;  
            self.processes.movingSelection = true;
          } else {
            self.stage.selectedShapes = [];
            
            //removing selector  
            postOffice.dispatch(selector, 'remove');
            self.stage.removeChild(selector);
            self.stage.update();
          }
          
        } else {

          shape = new Shape();
          shape.x = startPoint.x;
          shape.y = startPoint.y;
          shape.points = [];
  

          g = shape.graphics;

            
          var lastChild = self.stage.getLastChild();
          shape.id = lastChild? (lastChild.id + 1) : 1;    
          self.stage.addChild(shape);
         
          shape.points.push({x: shape.x, y: shape.y});

          selection = setTimeout(function() {
            self.processes.selecting = true;
          }, 175);
        }

      },
      mousemove: function(e) {
        
        if (self.processes.mousedown) {
          shape.commands = [];

          let distance = {
            x: e.offsetX - startPoint.x,
            y: e.offsetY - startPoint.y
          };

          if (self.processes.selecting) {
            shape.name = 'selection';
            g.clear();

            let beginStroke = g.beginStroke('black').command;
            let setStrokeDash = g.setStrokeDash([10, 2], 0).command;
            let drawRect = g.drawRect(0, 0, distance.x, distance.y).command;

            /*
              The commands is labeled because the name of the prototype's functions
              lost in the sockets
            */
            shape.commands.push(
              {'beginStroke': beginStroke},
              {'setStrokeDash': setStrokeDash},
              {'drawRect': drawRect}
            );

            shape.width = distance.x;
            shape.height = distance.y;

            //removing the last element
            if (shape.points[1]) {shape.points.splice(1, 1);}
            shape.points.push({
              x: (shape.x + distance.x),
              y: (shape.y + distance.y)
            });

          } else if (self.processes.movingSelection) {
            if (self.stage.selectedShapes.length > 0) {

              let allShapes = [].concat(self.stage.selectedShapes, selector);

              allShapes.forEach(function(shape) {
                shape.x += distance.x;
                shape.y += distance.y;

                shape.points.forEach(function(point) {
                  point.x += distance.x;
                  point.y += distance.y;
                });

                shape.setAABB();

              });

              startPoint = {
                x: e.offsetX,
                y: e.offsetY
              };

              postOffice.dispatch(allShapes);
              self.stage.update();

            }

          } else {
            self.cancelSelection();
            self.processes.drawing = true;

            if (!self.processes.drawingStarted) {
              shape.name = 'stroke';
              self.processes.drawingStarted = true;
            }
            else {

              if(old.x){
                let beginStroke = g.beginStroke(self.props.color).command;
                let setStroke = g.setStrokeStyle(self.props.size, "round").command;
                let moveTo = g.moveTo(old.x, old.y).command;
                let lineTo = shape.graphics.lineTo(distance.x, distance.y).command;

                /*
                  The commands is labeled because the name of the prototype's functions
                  lost in the sockets
                */
                shape.commands.push(
                  {'beginStroke': beginStroke},
                  {'setStroke':setStroke},
                  {'moveTo': moveTo},
                  {'lineTo': lineTo}
                );  
              
                shape.points.push({
                  x: (distance.x + shape.x),
                  y: (distance.y + shape.y)
                });
                
              }
              
              old.x = distance.x;
              old.y = distance.y;

            }

          }
          postOffice.dispatch(shape);
          self.stage.update();
        }
      },
      mouseup: function() {

        if(shape){
          if (shape.points.length > 1) {
            shape.setAABB();
            postOffice.dispatch(shape);
            self.stage.update();
          }  
        }

        let region = shape.getBounds();
        if (shape.name == 'selection') {
          let region = shape.getBounds();
          let children = self.stage.children;
          self.stage.selectedShapes = [];

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
              if(bounds){
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
  
                if (childIsInside) {self.stage.selectedShapes.push(child);}
                  
              }
            }
          });
        }
        
        self.restartProcesses();
      }
    });

    function isInsideRegion(point) {

      var pointIsInside = false;

      if (selectionRegion) {
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
