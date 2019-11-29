import React, { Component } from "react";

class ViewHistory extends Component {
  state = {
    data: [],
    error: null
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  componentDidMount() {
    fetch("http://localhost:5000/customer_view_history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.props.getCurrentUser()
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => this.setState({ data }))
      .catch(err => this.setState({ error: "Internal Server Error." }));
  }

  renderData = () => {
    return this.state.data.map((history, index) => {
      const { movName, thName, comName, creditCardNum, movPlayDate } = history;
      return (
        <tr key={index}>
          <td>{movName}</td>
          <td>{thName}</td>
          <td>{comName}</td>
          <td>{creditCardNum}</td>
          <td>{movPlayDate.match("[0-9]{2}[ ][a-zA-Z]{3}[ ][0-9]{4}")[0]}</td>
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
                <th style={this.stickyHeader}>Movie</th>
                <th style={this.stickyHeader}>Theater</th>
                <th style={this.stickyHeader}>Company</th>
                <th style={this.stickyHeader}>Card Number</th>
                <th style={this.stickyHeader}>View Date</th>
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
