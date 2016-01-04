class Stage extends createjs.Stage {
  
  constructor(props){
    super(props);
    this.log = new Map();
  };
  
  registerLog(){
    this.log.set(Date.now(),this.children);
  };
  
  update() {
    super.update();
    this.registerLog();
  };
}

export default Stage;
