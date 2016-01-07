/*global PHONE, CONTROLLER*/
import React from 'react';
import _ from 'lodash';

import SocketActions from '../../actions/SocketActions';

var self;

class Phone extends React.Component {

  constructor(props) {
    super(props);
    self = this;
  }


  componentDidMount(){

    let user;

    this.users = this.props.users;

    var nome = prompt('Qual é o seu nome?');
    
    var user = this.getUserName(nome);
    
    console.log(user);
    
    SocketActions.insertNewUser(user);
    
    console.log(this.users);

    var audio = document.getElementById('audio');
    
    console.log(audio);
    
    var phone = window.phone = PHONE({
        number: user,
        publish_key   : 'pub-c-cff935ed-df99-44ec-89ad-6d35c34f1853',
	      subscribe_key : 'sub-c-dfea45ae-b4be-11e5-a705-0619f8945a4f',
	      media         : { audio : true, video : false },
	      ssl: true
      });
    
    var ctrl = window.ctrl = CONTROLLER(phone);
      
    ctrl.ready(function(){ 
      console.log('user is ready');
    });
    
    ctrl.receive(function(session){

      session.connected(function(session){
        audio.src = session.video.currentSrc;
      });

      session.ended(function(session){
        this.bye();
      });

    });
        
  }
  
  componentWillReceiveProps(props) {
    console.log(props.users)
  }
  
  getUserName(name){
    let user;
    
    if(this.users.indexOf(name) !== -1){
      user = name
    }else{
      user = this.getUserName(name + '1');
    }
    
    return user;
  }
      
  end(){
    
  }


  call(){
    if(!window.phone) alert("faça login!");
    else{
      $('.call').css('display', 'none');
      $('.hangup, .duration').css('display', 'inline');
      
      this.users.forEach(function(number){
        phone.dial(number);
      })
    }
  }
  
  bye(){
    ctrl.hangup();
    $('.call').css('display', 'inline');
    $('.hangup, .duration').css('display', 'none');
  }
 
  render () { 
    return(
      <div id='Phone'>
        <span className='call' onClick={this.call}><i className="fa fa-phone"></i></span>
        <span className='hangup'onClick={this.bye} ><i className="fa fa-stop"></i></span>
        <span className='duration'>0:00</span>
        <audio autoPlay='autoplay' id='audio'></audio>  
      </div>  
    );
  }

}

export default Phone;
