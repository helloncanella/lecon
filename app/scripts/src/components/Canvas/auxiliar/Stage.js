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
    
    let lastChild = this.getLastChild();
    
    this.removedChildren.push(lastChild);
    this.removeChild(lastChild);
    
    super.update();

    return this.lastChild;

  };
  
  addLastRemovedChild(){
    this.lastRemovedChild = this.removedChildren.splice(-1,1)[0]; //Store in order to use it futurally
    this.addChild(this.lastRemovedChild);
    super.update();
    
    return this.lastRemovedChild;
    
  };
  
  getLastChild() {
    
    var index = this.children.length - 1;
    this.lastChild = this.getChildAt(index);
    
    return this.lastChild;
  }
  
}

export default Stage;
