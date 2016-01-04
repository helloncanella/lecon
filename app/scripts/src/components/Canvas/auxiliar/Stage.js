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
    this.lastChild =  this.getChildAt(lastChildIndex);
    
    this.removedChildren.push(this.lastChild);
    this.removeChild(this.lastChild);
    this.update();

    return this.lastChild;

  };
  
  addLastRemovedChild(){
    this.lastRemovedChild = this.removedChildren.splice(-1,1)[0]; //Store in order to use it futurally
    this.addChild(this.lastRemovedChild);
    this.update();
    
    return this.lastRemovedChild;
    
  };
  
}

export default Stage;
