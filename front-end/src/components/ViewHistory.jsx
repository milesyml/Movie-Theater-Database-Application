import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewHistory extends Component {
  state = {
    data: []
  };

  renderData = () => {
    return this.state.data.map((history, index) => {
      const { movieName, theaterName, company, cardNum, viewDate } = history;
      return (
        <tr key={index}>
          <td>{movieName}</td>
          <td>{theaterName}</td>
          <td>{company}</td>
          <td>{cardNum}</td>
          <td>{viewDate}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>View History</h1>
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
                <th className="sticky-header">Movie</th>
                <th className="sticky-header">Theater</th>
                <th className="sticky-header">Company</th>
                <th className="sticky-header">Card Number</th>
                <th className="sticky-header">View Date</th>
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

export default ViewHistory;
