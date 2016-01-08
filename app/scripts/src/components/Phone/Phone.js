/*global PHONE, CONTROLLER*/

import React from 'react';
import _ from 'lodash';

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
    var phoneDiv = document.getElementById('phone');
    
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

      session.connected(function(session){
        phoneDiv.appendChild(session.video);
      });

      session.ended(function(session){
        console.log(session.number);
        self.ctrl.getVideoElement(session.number).remove();
      });
        
    });
    
    
    // Forcing the retrivement of name different of null  
    function getNonNullName(){
      var name = prompt('qual é o seu nome ?');
      
      if(!name){
        name = getNonNullName();
      }
      
      return name;
    }
  
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
  
  makeCall(){
    
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
      <div id='phone'>
        <button onClick={this.makeCall}>Call</button>
      </div>
    );
  }

}

export default Phone;
