import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import danger from './danger.png'
import mild from './mild.png'
import normal from './normal.png'
import extreme from './extreme.png'
import { Icon } from "leaflet";
export default class QuakeMap extends Component {
  mapstyle = {
    width: "100%",
    height: "100%",
  };

  markerStylemild = {
    backgroundColor: "#0fa2db",
  };
  markerStylemedium = {
    backgroundColor: "#cadb0f",
  };
  markerStyledanger = {
    backgroundColor: "#db0f0f",
  };
  markerStyleextreme = {
    backgroundColor: "#3c0699",
  };
  
  renderMarker = (city) => 
   { 
     let length = city.properties.mag > 6
     ? 40
     : city.properties.mag > 5
     ? 30
     : city.properties.mag > 4
     ? 25
     : 20
     let breadth = length
     let icon = new Icon({iconUrl:city.properties.mag > 6
    ? extreme
    : city.properties.mag > 5
    ? danger
    : city.properties.mag > 4
    ? mild
    : normal,
    iconSize:[length,breadth]
   })
    return (
      <Marker
        key={city.id}
        position={[city.geometry.coordinates[1], city.geometry.coordinates[0]]}
        icon={icon}
      >
        <Popup>
          {city.properties.title}. <br />{" "}
          {new Date(city.properties.time).toGMTString()}
          <br />
          {city.properties.tsunami
            ? "TSUNAMI WARNING ISSUED!!"
            : "No Tsunami Warning issues"}
        </Popup>
      </Marker>
    );
  };
  render() {
    return (
      <div className="container">
        {console.log(this.props.mapProp.center,this.props.mapProp.zoom)}
      <MapContainer
        center={this.props.mapProp.center}
        zoom={this.props.mapProp.zoom}
        scrollWheelZoom={false}
        style={this.mapstyle}
      >
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />

        {this.props.data.map(this.renderMarker)}
      </MapContainer>
      </div>
    );
  }
}
