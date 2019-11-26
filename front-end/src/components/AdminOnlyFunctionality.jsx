import React, { Component } from "react";
import { ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

class AdminOnlyFunctionality extends Component {
  state = {
    root: "/adminOnlyFunctionality"
  };
  render() {
    return (
      <div className="center-div">
        <h1>Admin-Only Functionality</h1>
        <div className="col-btn">
          <Link to={this.state.root + "/manageUser"}>
            <button className="btn btn-primary m-1 btn-block">
              Manage User
            </button>
          </Link>
          <Link to={this.state.root + "/manageCompany"}>
            <button className="btn btn-primary m-1 btn-block">
              Manage Company
            </button>
          </Link>

          <Link to={this.state.root + "/createMovie"}>
            <button className="btn btn-primary m-1 btn-block">
              Create Movie
            </button>
          </Link>

          <Link to={this.state.root + "/exploreTheater"}>
            <button className="btn btn-primary m-1 btn-block">
              Explore Theater
            </button>
          </Link>

          <Link to={this.state.root + "/visitHistory"}>
            <button className="btn btn-primary m-1 btn-block">
              Visit History
            </button>
          </Link>

          <Link to={"/"}>
            <button className="btn btn-primary m-1 btn-block">Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AdminOnlyFunctionality;
