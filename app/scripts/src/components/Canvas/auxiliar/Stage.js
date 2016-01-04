var self;

class Stage extends createjs.Stage {
  
  constructor(props){
    super(props);
    this.log = [];
    self = this; 
 
    this.removedChildren = [];
  };
  
  registerLog(){
    
    var data = {
      timeStamp: Date.now(),
      children: self.children
    };
    
    this.log.push(data);

  };
  
 
  update() {
    super.update();
    this.registerLog();
  };
  
  removeLastChild(){
    var lastChildIndex = this.children.length - 1;
    var lastChild = this.getChildAt(lastChildIndex);
    
    this.removedChildren.push(lastChild);
    this.removeChild(lastChild);
    this.update();
  }
  
  addLastRemovedChild(){
    var lastRemovedChild = this.removedChildren.splice(-1,1)[0];
    this.addChild(lastRemovedChild);
    this.update();
  }
  
  
}

export default Stage;
