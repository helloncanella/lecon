import React from 'react';
import Canvas from './components/Canvas/Canvas';
import Phone from './components/Phone/Phone';


import PencilCase from './components/PencilCase/PencilCase';

import CanvasStore from './stores/CanvasStore';
import PhoneStore from './stores/PhoneStore';

var self;

function getAppStates (){
  return({
    toUpdate: CanvasStore.getShapesToUpdate(),
    color: CanvasStore.getPencilColor(),
    size: CanvasStore.getPencilSize(),
    users: PhoneStore.getAllUsers()
  });
}

class AppView extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    
  }
  
  componentWillMount(){
    this.setState(getAppStates());
  }
  
 
  componentDidMount(){
    $(window).resize(function(){
      self.forceUpdate();
    });

    CanvasStore.addChangeListener(this.onChange);
    PhoneStore.addChangeListener(this.onChange);
    
    
  }

  onChange (){
    self.setState(getAppStates());
  }

  render () {

    let toUpdate = this.state.toUpdate || '';
    let color= this.state.color;
    let size= this.state.size;

    return( 
      <div>
        <Phone users={this.state.users} />
        <PencilCase />
        <Canvas color={color} size={size} toUpdate={toUpdate} id={'canvas'} width={3000} height={3000}/>
      </div>
    );
  }

}

export default AppView;
