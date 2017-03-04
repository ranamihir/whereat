import { Component } from 'react';

import _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker, Circle, InfoWindow } from 'react-google-maps';
import canUseDOM from "can-use-dom";

require('../../scss/index.scss');

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
        <Marker
          defaultPosition={props.center}
          title="You are here." />
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

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      content: null,
      radius: 10000,
      isUnmounted: false,
      markers: []
      // markers: [{
      //   position: {
      //     lat: 25.0112183,
      //     lng: 121.52067570000001,
      //   },
      //   key: `Taiwan`,
      //   defaultAnimation: 2,
      // }],
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
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
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    console.log(map);
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(),
      },
    ];
    this.setState({
      markers: nextMarkers
    });
    console.log(this.state);
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

  render() {
    return (
      <div style={{height: `100vh`}}>
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
