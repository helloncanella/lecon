/*global PHONE, CONTROLLER*/

import React from 'react';
import _ from 'lodash';
import formatTime from './auxiliar/formatTime';

import SocketActions from '../../actions/SocketActions';

var self, isPhoneReady = false;

var callingParticipants;

class Phone extends React.Component {

  constructor(props) {
    super(props);
    self = this;
    this.contacts = [];
  }
  
  componentDidMount(){
    
    // USE IT IN PRODUCTION MODE, IN OTHER TO GUARANTEE UNIQUESS IN THE USERNAME
    // $(function() {
    //   $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
    //     function(json) {
    //       self.username = json.ip;
          
    //       self.subscribeUser();
    //       self.configPhone();
    //     }
    //   );
    // });

    
    self.username = prompt('seu nome');
    self.subscribeUser();
    self.configPhone();

  }
  
  subscribeUser(){
    
    this.usersManager = window.pubnub = PUBNUB.init({
      publish_key: 'pub-c-6151ab03-7650-41eb-9ba9-31cb851695d6',
      subscribe_key: 'sub-c-dd9411f4-b70c-11e5-b089-02ee2ddab7fe',
      uuid: self.username,
      ssl: true,
    });
    
    this.usersManager.subscribe({
      channel: 'classroom',
      noheresync: true,
      
      message: function(m){
        console.log(m);
      },
    
      presence: function(subscription) {
        console.log(subscription);
      },
    
      state: {
        name: self.username,
        timestamp: new Date()
      }
    });

  }
  
  configPhone(){
    
    this.phone = window.phone = PHONE({
        number: self.username,
        publish_key   : 'pub-c-6151ab03-7650-41eb-9ba9-31cb851695d6',
	      subscribe_key : 'sub-c-dd9411f4-b70c-11e5-b089-02ee2ddab7fe',
	      media         : { audio : true, video : false },
	      ssl: true
      });
      
    this.ctrl = window.ctrl = CONTROLLER(this.phone);  
  
    this.ctrl.ready(function(pico){
      isPhoneReady = true;
    });

    this.ctrl.receive(function(session){
      
      session.connected(function(session){

        if(!self.clock){
          self.hideCallIcon();
          self.startClock(session.started);
        }
        
        var audio = $("<audio autoplay='autoplay'></audio>");
        $('#Phone').append(audio);
        
        audio.attr({
          'data-user': session.number,
          'src': session.video.currentSrc
        });
       

      });
      
      session.ended(function(session){
        self.removeUser(session.number);
      });
    
    })
    
  }
  
  startClock(start){
    this.clock = setInterval(function(){
      var duration = formatTime(Math.floor((Date.now() - start)/1000));
      $('.duration').html(duration);
    },1000);
  }
      
  destroyClock(){
    clearInterval(this.clock);
    this.clock = null;
  }
  
  hideCallIcon(){
    $('.call').css('display', 'none');
    $('.hangup, .duration').css('display', 'inline');
  }
  
  hideHangUpIcon(){
    $('.call').css('display', 'inline');
    $('.hangup, .duration').css('display', 'none');
  }
  
  
  hangup(){
    self.ctrl.hangup();
    self.hideHangUpIcon();
    self.destroyClock();
  }
  
  removeUser(user){
    $('*[data-user="'+user+'"]').remove();
    
    var index = callingParticipants.indexOf(user);    
    callingParticipants.splice(index,1);

    pubnub.here_now({
      channel : 'classroom',
      callback : function(m){
        var onlineUsers = m.occupancy;
        
        if(callingParticipants.length <= 1 || onlineUsers <= 1){
          self.destroyClock();
          self.hangup();
        }
        
      }
    })

  }

  call(){

    let contacts;
    
    pubnub.here_now({
      
      channel : 'classroom',
      
      callback : function(m){
        let contacts = m.uuids;
      
        if(contacts.length <= 1){
          alert('A sala está vazia');
        }else{
          callingParticipants = contacts;
          contacts.forEach( function(contact){
            if(contact !== self.username){
              self.phone.dial(contact);
            }
          });
        }
      }
    
      
    })
  }
  
  
  render () {
    return(
      <div id='Phone'>
        <span className='call' onClick={this.call}><i className="fa fa-phone"></i></span>
        <span className='hangup' onClick = {this.hangup}><i className="fa fa-stop"></i></span>
        <span className='duration'>0:00</span>
        <audio id='signal'></audio>
      </div> 
    );
  }

}

export default Phone;
