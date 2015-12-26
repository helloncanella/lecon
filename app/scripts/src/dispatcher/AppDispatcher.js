import Flux from 'flux';
var Dispatcher = Flux.Dispatcher;

var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function (action) {
  this.dispatch(action);
};

export default AppDispatcher;
