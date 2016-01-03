import React from 'react';
import _ from 'lodash';

var self;

class PencilCase extends React.Component {

  constructor(props) {
    super(props);
    self = this;
  }

  componentDidMount(){
    var circles = $('.color i');

    circles.each(function(key, circle){
      $(circle).css({
        'color':$(circle).data('color')
      })
    })
    
  }
 
  render () { 
    return(
      <div id='PencilCase'>
        <span className='color'><i className="fa fa-circle" data-color='red'></i></span>
        <span className='color'><i className="fa fa-circle" data-color='blue'></i></span>
        <span className='color'><i className="fa fa-circle" data-color='green'></i></span>
        <span className='color'><i className="fa fa-circle" data-color='black'></i></span>
        <span className='eraser'><i className="fa fa-eraser" data-color='white'></i></span>
        <span className='size'>
          <h4>SIZE</h4>
          <input/>
        </span>
      </div>  
    );
  }

}

export default PencilCase;
