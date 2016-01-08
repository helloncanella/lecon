var formatTime = function(seconds){
  
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - (hours * 3600)) / 60);
  var seconds = Math.round(seconds - (hours * 3600) - (minutes * 60));
  
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  
  if (hours > 0) {
  
    if (hours < 10) {
      hours = "0" + hours;
    }
  
    return hours + ':' + minutes + ':' + seconds

  }
  
  return minutes + ':' + seconds;

}

export default formatTime