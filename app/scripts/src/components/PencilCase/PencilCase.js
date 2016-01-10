import React from 'react';
import _ from 'lodash';

import CanvasActions from '../../actions/CanvasActions';

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
    
    $('.color').click(function(e){
     var color =  $(this).children('i').data('color');
     CanvasActions.changePencilColor(color);
    });
    
    $('.eraser').click(function(e){
      CanvasActions.changePencilColor('white');
    })
 
    $('input').on({
      keydown: function(e) {
        var key = e.keyCode;
        
        //Limiting the permited characters to 'delete', 'backspace' and numbers 
        if(!(key<106 || key>95 && [46,8].indexOf(key)>-1)){
          e.preventDefault();
        }
      },
      keyup: function(e){
        CanvasActions.changePencilSize($(this).val());
      }
    })
    
  }
 
  render () { 
    return(
      <div id='PencilCase'>
        <span className='color'><i className="fa fa-circle" data-color='red'></i></span>
        <span className='color'><i className="fa fa-circle" data-color='blue'></i></span>
        <span className='color'><i className="fa fa-circle" data-color='green'></i></span>
        <span className='color'><i className="fa fa-circle" data-color='black'></i></span>
        <span className='size'>
          <input/>
        </span>
      </div>  
    );
  }

}

export default PencilCase;
