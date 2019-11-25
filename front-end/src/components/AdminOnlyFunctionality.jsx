import React, { Component } from "react";
import { ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

class AdminOnlyFunctionality extends Component {
  render() {
    return (
      <div className="center-div">
        <h1>Admin-Only Functionality</h1>

        {/* <div className="container">
          <div className="row justify-center">
            <div className="col-xs-2">
              <button className="btn btn-primary m-2">Manage User</button>
            </div>
            <div className="col-xs-2">
              <button className="btn btn-primary m-2">Explore Theater</button>
            </div>
          </div>
          <div className="row justify-center">
            <div className="col-xs-2">
              <button className="btn btn-primary m-2">Manage Company</button>
            </div>
            <div className="col-xs-2">
              <button className="btn btn-primary m-2">Visit History</button>
            </div>
          </div>
          <div className="row justify-center">
            <div className="col-xs-2">
              <button className="btn btn-primary m-2">Create Movie</button>
            </div>
            <div className="col-xs-2">
              <Link to="/">
                <button className="btn btn-primary m-2">Back</button>
              </Link>
            </div>
          </div>
        </div>*/}

        <div className="col-btn">
          <button
            onClick={() => this.props.goToManageUser(this.props)}
            className="btn btn-primary m-1 btn-block"
          >
            Manage User
          </button>
          <button
            onClick={() => this.props.goToManageCompany(this.props)}
            className="btn btn-primary m-1 btn-block"
          >
            Manage Company
          </button>
          <button
            onClick={() => this.props.goToCreateMovie(this.props)}
            className="btn btn-primary m-1 btn-block"
          >
            Create Movie
          </button>
          <button
            onClick={() => this.props.goToExploreTheater(this.props)}
            className="btn btn-primary m-1 btn-block"
          >
            Explore Theater
          </button>
          <button
            onClick={() => this.props.goToVisithistory(this.props)}
            className="btn btn-primary m-1 btn-block"
          >
            Visit History
          </button>
          <button
            onClick={() => this.props.goToHome(this.props)}
            className="btn btn-primary m-1 btn-block"
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default AdminOnlyFunctionality;
