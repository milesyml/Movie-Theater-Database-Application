import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserFunctionality extends Component {
  render() {
    return (
      <div className="center-div">
        <h1>User Functionality</h1>
        <div className="grid-1-col-3-row-btn">
          <Link to="/exploreTheater" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Explore Theater
            </button>
          </Link>

          <Link to="/visitHistory" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Visit History
            </button>
          </Link>

          <Link to="/" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default UserFunctionality;
