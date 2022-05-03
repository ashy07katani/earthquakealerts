import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {


  onChangeDay = (e)=>{
    console.log("changing from: ",e.target.value,this.props.fromChange)

    this.props.fromChange(e.target.value)
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            QuakeAlert
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Prevention</a>
              </li> */}
            </ul>
            <div className="d-flex">
              <select
                className="form-select form-select-sm text-center"
                aria-label=".form-select-sm example"
                onChange={this.onChangeDay}
              >
                <option value="none" defaultValue={"in"}>
                  Data for 
                </option>
                <option value={1}>Last 1 Day</option>
                <option value={3}>Last 3 Days</option>
                <option value={5}>Last 5 Days</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
