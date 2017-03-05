import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from './containers/Map';
import Sidebar from './containers/Sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        name: 'Tin Tin',
        desc: 'Cool cafe!',
        userName: 'Aman Shri.',
        rating: 4.7,
        marker: {
          position: {
            lat: 29.8704979,
            lng: 77.9021614
          },
          key: Date.now(),
          defaultAnimation: 2,
        }
      }]
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem(item) {
    const newItems = [
      ...this.state.items,
      item
    ];
    this.setState({
      items: newItems
    });
  }
  render() {
    return (
      <div>
        <Map
          items={this.state.items}
          addItem={this.addItem} />
        <Sidebar
          items={this.state.items} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);
