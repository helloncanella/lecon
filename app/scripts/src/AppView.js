import React from 'react';
import Canvas from './components/Canvas/Canvas';

import CanvasStore from './stores/CanvasStore';

var self;

function getAppStates (){
  return({
    toUpdate: CanvasStore.getShapesToUpdate()
  });
}

class AppView extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }

  componentDidMount(){
    $(window).resize(function(){
      self.forceUpdate();
    });

    CanvasStore.addChangeListener(this.onChange);
  }

  onChange (){
    self.setState(getAppStates());
  }

  render () {

    this.state = this.state || {};
    let toUpdate = this.state.toUpdate || '';

    return(
      <Canvas toUpdate={toUpdate} id={'canvas'} width={3000} height={3000}/>
    );
  }

}

export default AppView;
