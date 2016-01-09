/*global PHONE, CONTROLLER*/

import React from 'react';
import _ from 'lodash';
import formatTime from './auxiliar/formatTime';

import SocketActions from '../../actions/SocketActions';

var self, isPhoneReady = false;

class Phone extends React.Component {

  constructor(props) {
    super(props);
    self = this;
  }
  
  componentWillReceiveProps(props){
    this.users = props.users;
    console.log(this.users);
  }
  
  componentDidMount(){
    this.users = this.props.users;   
    
    var name = getNonNullName();

    /*
      BUG - PhoneStore is sending an empty array before the reception of list of users, 
      the verification the uniquess verification of username is failing.  
    */
    this.username = this.getUsername(name);
    
    /*Updating the varible this.user*/  
    SocketActions.insertNewUser(this.username);
  
    // IMPORTANT: window.phone needs to be set in order to the code to work properly!  
    this.phone = window.phone = PHONE({
        number: this.username,
        publish_key   : 'pub-c-cff935ed-df99-44ec-89ad-6d35c34f1853',
	      subscribe_key : 'sub-c-dfea45ae-b4be-11e5-a705-0619f8945a4f',
	      media         : { audio : true, video : false },
	      ssl: true
      });
    
    this.ctrl = window.ctrl = CONTROLLER(this.phone);  
    
    this.ctrl.ready(function(pico){
      isPhoneReady = true;
    });
    
    this.ctrl.receive(function(session){

      var clock;

      session.connected(function(session){

        self.hideCallIcon();
        
        var audio = $("<audio autoplay='autoplay'></audio>");
        $('#Phone').append(audio);
        
        audio.attr({
          'data-user': session.number,
          'src': session.video.currentSrc
        });
        
        startClock(session.started);

      });

      session.ended(function(session){
        destroyClock();
        self.hideHangUpIcon();
        getAudioElement(session.number).remove();
      });
      
      
      function startClock(start){
        clock = setInterval(function(){
          var duration = formatTime(Math.floor((Date.now() - start)/1000));
          $('.duration').html(duration);
        },1000);
      }

      function destroyClock(){
        clearInterval(clock);
        $('.duration').html('00:00');
      }
      
    });
    
    function getAudioElement(user){
      console.log($('*[data-user="'+user+'"]'));
      return $('*[data-user="'+user+'"]');
    }
    
    // Forcing the retrivement of name different of null  
    function getNonNullName(){
      var name = prompt('qual é o seu nome ?');
      
      if(!name){
        name = getNonNullName();
      }
      
      return name;
    }
  
  }
  
  hideCallIcon(){
    $('.call').css('display', 'none');
    $('.hangup, .duration').css('display', 'inline');
  }
  
  hideHangUpIcon(){
    $('.call').css('display', 'inline');
    $('.hangup, .duration').css('display', 'none');
  }
  
  
  getUsername(name){
    let username;
    
    if(this.users.indexOf(name) === -1){
      username = name;
    }else{
      username = this.getUsername(name + '*');
    }
  
    return username;
    
  }
  
  bye(){
    self.ctrl.hangup();
  }
  
  hello(){
    
    if(!isPhoneReady){
      alert('Carregando telefone! \n \n Espere alguns segundos e aperte LIGAR novamente');      
    }else{
      let currentUser = self.username; 
      
      console.log(self.users);
      
      self.users.forEach(function(user){
        
        if(user && user !== currentUser ){
          self.phone.dial(user);
        } 

      })  
    }

  }
  
  render () {
    return(
      <div id='Phone'>
        <span className='call' onClick={this.hello}><i className="fa fa-phone"></i></span>
        <span className='hangup'onClick={this.bye} ><i className="fa fa-stop"></i></span>
        <span className='duration'>0:00</span>
        <audio id='signal'></audio>
      </div> 
    );
  }

}

export default Phone;
