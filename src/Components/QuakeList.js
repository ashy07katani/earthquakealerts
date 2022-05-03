import React, { Component } from "react";
import "./smallcss.css";
export default class QuakeList extends Component {
  // myPos = null

  constructor() {
    super();
    this.state = { time: false, dist: false, mag: false };
  }

  elementStyle = { cursor: "pointer" };

  sortQuake(criteria, array) {
    criteria === "mag"
      ? array.sort((a, b) => {
          return b.properties.mag - a.properties.mag;
        })
      : criteria === "time"
      ? array.sort((a, b) => {
          return b.properties.time - a.properties.time;
        })
      : array.sort((a, b) => {
          return a.distance - b.distance;
        });
  }

  onChangeRadio = (e) => {
    console.log(
      e.target.value,
      this.state.time,
      this.state.dist,
      this.state.mag
    );
    //console.log(this.props.data)
    this.setState({
      time: false,
      dist: false,
      mag: false,
      [e.target.value]: true,
    });
    console.log(this.props.data);
  };

  quakeClicked = (event) => {
    console.log("event.target:", event.target);
    console.log(
      "event.currentTarget",
      event.currentTarget.getAttribute("quakezoom"),
      event.currentTarget.getAttribute("latitude"),
      event.currentTarget.getAttribute("longitude")
    );
    this.props.onClickQuake({
      center: [
        parseFloat(event.currentTarget.getAttribute("latitude")),
        parseFloat(event.currentTarget.getAttribute("longitude")),
      ],
      zoom: parseInt(event.currentTarget.getAttribute("quakezoom")),
    });
  };
  render() {
    console.log(this.state.dist, this.state.mag, this.state.time);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "15px",
            backgroundColor: "grey",
          }}
        >
          <h3>Sorting Criteria</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form-check">
              <input
                onChange={this.onChangeRadio}
                checked={this.state.time}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="time"
              />
              <label className="form-check-label" htmlfor="flexRadioDefault1">
                Time
              </label>
            </div>
            <div className="form-check">
              <input
                onChange={this.onChangeRadio}
                checked={this.state.dist}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="dist"
              />
              <label className="form-check-label" htmlfor="flexRadioDefault1">
                Distance
              </label>
            </div>
            <div className="form-check">
              <input
                onChange={this.onChangeRadio}
                checked={this.state.mag}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="mag"
              />
              <label className="form-check-label" htmlfor="flexRadioDefault2">
                Magnitude
              </label>
            </div>
          </div>
        </div>
        {this.state.mag
          ? this.sortQuake("mag", this.props.data)
          : this.state.time
          ? this.sortQuake("time", this.props.data)
          : this.sortQuake("dist", this.props.data)}
        <div className="list-group" style={{ overflowX: "scroll" }}>
          {this.props.data.map((city) => {
            this.elementStyle = {
              color: city.properties.tsunami ? "red" : "black",
            };
            return (
              <li
                key={city.id}
                href="#"
                className="list-group-item list-group-item-action elements"
                // style={{"&:hover": {
                //   backgroundColor: "#f2c7d1",
                //   cursor:"pointer"
                // }}}
                quakezoom={12}
                onClick={this.quakeClicked}
                latitude={city.geometry.coordinates[1]}
                longitude={city.geometry.coordinates[0]}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{city.properties.title}</h5>
                </div>
                <p className="mb-1">
                  {new Date(city.properties.time).toGMTString()}
                </p>

                <small>
                  <strong>{city.distance.toFixed(2)} Kms away from you.</strong>
                  <br />
                  {city.properties.tsunami ? (
                    <strong>"TSUNAMI WARNING ISSUED!!"</strong>
                  ) : (
                    "No Tsunami Warning issues"
                  )}
                </small>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}
