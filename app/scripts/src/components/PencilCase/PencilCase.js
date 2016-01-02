import React from 'react';
import _ from 'lodash';

var self;

class PencilCase extends React.Component {

  constructor(props) {
    super(props);
    self = this;
  }

 
  render () {
    return(
      <div id='PencilCase'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> 
    );
  }

}

export default PencilCase;
