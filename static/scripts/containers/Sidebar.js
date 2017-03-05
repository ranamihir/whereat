import { Component } from 'react';

require('../../scss/sidebar.scss');

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const itemList = this.props.items.map((item, index) => {
      return (
        <div className="item">
          <img src="static/map-marker.png"
            style={{width: `40px`}}/>
          <div className="props">
            <p className="name">{item.name}</p>
            <p className="desc">{item.desc}</p>
            <p className="user">Added by: {item.userName}</p>
            <p className="rating">Rating: {item.rating}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="sidebar">
        <h1 className="heading">where at?</h1>
        <div className="list">
          {itemList}
        </div>
      </div>
    );
  }
}
