import React from 'react';
import Canvas from './components/Canvas/Canvas';

var self, canvas={};

class AppView extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }

  componentDidMount(){
    $(window).resize(function(){
      self.forceUpdate();
    });
  }


  render () {
    return(
      <Canvas id={'canvas'} width={$(window).width()} height={$(window).height()}/>
    );
  }

}

export default AppView;
