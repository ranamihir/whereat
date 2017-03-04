import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from './containers/Map';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);
