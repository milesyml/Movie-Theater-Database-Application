import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManagerCustomerFunctionality extends Component {
  render() {
    return (
      <div className="center-div">
        <h1>Manager-Customer Functionality</h1>
        <div className="grid-2-col-4-row-btn">
          <Link to="/theaterOverview" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Theater Overview
            </button>
          </Link>

          <Link to="/exploreMovie" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Explore Movie
            </button>
          </Link>

          <Link to="/scheduleMovie" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Schedule Movie
            </button>
          </Link>

          <Link to="/exploreTheater" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Explore Theater
            </button>
          </Link>

          <Link to="/viewHistory" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              View History
            </button>
          </Link>

          <Link to="/visitHistory" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Visit History
            </button>
          </Link>

          <Link to="/" className="item-span-2-cols" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ManagerCustomerFunctionality;
