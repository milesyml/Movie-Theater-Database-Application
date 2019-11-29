import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompanyDetail extends Component {
  state = {
    companyName: "",
    data: [],
    employeeNames: [],
    error: null
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  constructor(props) {
    super(props);
    this.state.companyName = this.props.match.params.companyName;
  }

  componentDidMount() {
    fetch("http://localhost:5000/admin_view_comDetail_combined", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comName: this.state.companyName
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => this.setState({ data: data[1], employeeNames: data[0] }))
      .catch(err => {
        if (err.message === "400") {
          this.props.history.push("/");
        } else {
          this.setState({ error: "Internal Server Error." });
        }
      });
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
      const { thName, manName, thCity, thState, thCapacity } = theater;
      return (
        <tr key={index}>
          <td>{thName}</td>
          <td>{manName}</td>
          <td>{thCity}</td>
          <td>{thState}</td>
          <td>{thCapacity}</td>
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

        {this.state.error && (
          <div className="alert alert-danger">{this.state.error}</div>
        )}

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

        <button
          className="btn btn-primary m-2"
          onClick={this.props.history.goBack}
        >
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default CompanyDetail;
