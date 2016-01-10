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