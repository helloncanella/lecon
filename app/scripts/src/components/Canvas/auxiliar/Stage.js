var self;

class Stage extends createjs.Stage {
  
  constructor(props){
    super(props);
    this.log = [];
    self = this;
  };
  
  registerLog(){
    var data = {
      timeStamp: Date.now(),
      children: self.children
    };
    this.log.push(data);
    
    console.log(this.log);
  };
  
  update() {
    super.update();
    this.registerLog();
  };
}

export default Stage;
