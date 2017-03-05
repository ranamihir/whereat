import { Component } from 'react';

import _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker, Circle, InfoWindow } from 'react-google-maps';
import canUseDOM from "can-use-dom";
import Modal from 'react-modal';

require('../../scss/map.scss');

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const AppMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    center={props.center}
    onClick={props.onMapClick}>
    {
      props.markers.map((marker, index) => (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(index)} />
      ))
    }
    {
      props.center && (
        // <Marker
        //   defaultPosition={props.center}
        //   title="You are here." />
        <InfoWindow position={props.center}>
          <div>{props.content}</div>
        </InfoWindow>
      )
    }
    {
      props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />)
    }
  </GoogleMap>
));

const modalStyle = {
  content: {
    left: 'auto !important',
    bottom: 'auto !important',
    right: '44px'
  }
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      center: null,
      content: null,
      radius: 250,
      isUnmounted: false,
      markers: [],
      e: null,
      newItem: {
        name: null,
        desc: null,
        userName: null,
        rating: 0,
        marker: {}
      }
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      if (this.state.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `You are here.`,
      });
    }, (reason) => {
      if (this.state.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${reason}).`,
      });
    });
    var mark = [];
    this.props.items.map((item, index) => {
      mark.push(item.marker);
    });
    this.setState({
      markers: mark
    });
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    // console.log(map);
    if (map) {
      // console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    this.setState({
      modalOpen: true,
      e: event
    });
    var item = this.state.newItem;
    item.marker = {
      position: event.latLng,
      key: Date.now(),
      defaultAnimation: 2
    };
    this.setState({
      newItem: item
    });
  }

  handleMarkerRightClick(targetMarker) {
    this.state.markers.splice(targetMarker, 1);
    this.setState({
      markers: this.state.markers
    });
  }

  componentWillUnmount() {
    this.setState({
      isUnmounted: true
    });
  }

  handleName(e) {
    var item = this.state.newItem;
    item.name = e.target.value;
    this.setState({
      newItem: item
    })
  }
  handleDesc(e) {
    var item = this.state.newItem;
    item.desc = e.target.value;
    this.setState({
      newItem: item
    })
  }
  handleUser(e) {
    var item = this.state.newItem;
    item.userName = e.target.value;
    this.setState({
      newItem: item
    })
  }
  handleRating(e) {
    var item = this.state.newItem;
    item.rating = e.target.value;
    this.setState({
      newItem: item
    })
  }

  addItem() {
    this.props.addItem(this.state.newItem);
    const newMark = [
      ...this.state.markers,
      this.state.newItem.marker
    ];
    this.setState({
      markers: newMark
    });
    this.closeModal();
  }

  closeModal() {
    this.setState({
      modalOpen: false,
      newItem: {
        name: null,
        desc: null,
        userName: null,
        rating: 0,
        marker: {}
      }
    });
  }

  render() {
    return (
      <div className="map-area">
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={undefined}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel="New Pin">
          <h1>Add new pin!</h1>
          <input type="text" placeholder="Place Name" onChange={this.handleName}/>
          <input type="text" placeholder="Description" onChange={this.handleDesc}/>
          <input type="text" placeholder="Rating" onChange={this.handleRating}/>
          <input type="text" placeholder="User Name" onChange={this.handleUser}/>
          <button className="add" onClick={this.addItem}>Add</button>
          <button className="cancel" onClick={this.closeModal}>Cancel</button>
        </Modal>
        <AppMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
          center={this.state.center}
          content={this.state.content}
          radius={this.state.radius}
        />
      </div>
    );
  }
}
