import React, { Component } from "react";
import { Link } from "react-router-dom";

class VisitHistory extends Component {
  state = {
    companyName: "",
    visitDateFrom: null,
    visitDateTo: null,
    allCompanyNames: [],
    data: []
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Submit");
    console.log(this.state);

    // TODO: backend call
  };

  renderCompanyNames = () => {
    return this.state.allCompanyNames.map((companyName, index) => {
      return (
        <option key={index} value={companyName}>
          {companyName}
        </option>
      );
    });
  };

  renderData = () => {
    return this.state.data.map((history, index) => {
      const { theater, address, company, visitDate } = history;
      return (
        <tr key={index}>
          <td>{theater}</td>
          <td>{address}</td>
          <td>{company}</td>
          <td>{visitDate}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>Visit History</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="grid-2-col">
              <div>
                <label htmlFor="companyName">Company Name</label>
                &nbsp;
                <select id="companyName" onChange={this.handleChange}>
                  <option defaultValue="All">All</option>
                  {this.renderCompanyNames()}
                </select>
              </div>

              <div>
                <label htmlFor="visitDateFrom">Visit Date</label>
                &nbsp;
                <input
                  type="date"
                  id="visitDateFrom"
                  style={{ width: 155 }}
                  onChange={this.handleChange}
                ></input>
                &nbsp;
                <span>--</span>
                &nbsp;
                <input
                  type="date"
                  id="visitDateTo"
                  style={{ width: 155 }}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <button type="submit" className="btn btn-primary m-2">
              Filter
            </button>
          </form>
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
                <th className="sticky-header">Theater</th>
                <th className="sticky-header">Address</th>
                <th className="sticky-header">Company</th>
                <th className="sticky-header">Visit Date</th>
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

export default VisitHistory;
