import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminCustomerFunctionality extends Component {
  render() {
    return (
      <div className="center-div">
        <h1>Admin-Customer Functionality</h1>
        <div className="grid-2-col-4-row-btn">
          <Link to="/manageUser" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Manage User
            </button>
          </Link>

          <Link to="/manageCompany" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Manage Company
            </button>
          </Link>

          <Link to="/createMovie" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Create Movie
            </button>
          </Link>

          <Link to="/exploreMovie" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Explore Movie
            </button>
          </Link>

          <Link to="/visitHistory" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Visit History
            </button>
          </Link>

          <Link to="/viewHistory" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              View History
            </button>
          </Link>

          <Link to="/exploreTheater" style={{ width: "100%" }}>
            <button className="btn btn-primary m-1 btn-block">
              Explore Theater
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

export default AdminCustomerFunctionality;
