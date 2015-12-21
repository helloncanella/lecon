import React from 'react';
import createjs from '../vendors/EaselJS/lib/easeljs-0.8.2.combined';


class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div className='App'>
        <h1>teco</h1>
      </div>
    );
  }

}

export default AppView;
