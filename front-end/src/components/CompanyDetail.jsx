import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompanyDetail extends Component {
  state = {
    companyName: "",
    data: [],
    employeeNames: [
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi",
      "hi"
    ]
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  constructor(props) {
    super(props);
    this.state.companyName = this.props.match.params.companyName;
  }

  renderEmployees = () => {
    const newNames = this.state.employeeNames.map(
      employeeName => employeeName + ", "
    );
    newNames[newNames.length - 1] = this.state.employeeNames.slice(-1)[0];
    return newNames.map((employeeName, index) => (
      <div key={index}>{employeeName}</div>
    ));
  };

  renderData = () => {
    return this.state.data.map((theater, index) => {
      const { theaterName, manager, city, state, capacity } = theater;
      return (
        <tr key={index}>
          <td>{theaterName}</td>
          <td>{manager}</td>
          <td>{city}</td>
          <td>{state}</td>
          <td>{capacity}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>Company Detail</h1>
          <div className="grid-2-col-2-row">
            <div>Name:</div>
            <div>{this.state.companyName}</div>
            <div>Employees:</div>
            <div className="list-of-string">{this.renderEmployees()}</div>
          </div>
        </div>

        <div style={{ height: 400, overflow: "auto" }}>
          <table
            className="table table-bordered table-hover"
            style={{
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th style={this.stickyHeader}>Theater Name</th>
                <th style={this.stickyHeader}>Manager</th>
                <th style={this.stickyHeader}>City</th>
                <th style={this.stickyHeader}>State</th>
                <th style={this.stickyHeader}>Capacity</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>

        <Link to="/manageCompany">
          <button className="btn btn-primary m-2">Back</button>
        </Link>
      </React.Fragment>
    );
  }
}

export default CompanyDetail;
