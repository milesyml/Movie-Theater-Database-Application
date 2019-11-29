import React, { Component } from "react";

class VisitHistory extends Component {
  state = {
    companyName: "All",
    visitDateFrom: "",
    visitDateTo: "",
    allCompanyNames: [],
    data: [],
    error: null
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  componentDidMount() {
    fetch("http://localhost:5000/get_companies", {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => this.setState({ allCompanyNames: data }))
      .then(something => this.filterVisitHistory())
      .catch(err => this.setState({ error: "Internal Server Error." }));
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    this.filterVisitHistory();
  };

  filterVisitHistory = () => {
    fetch("http://localhost:5000/user_filter_visitHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.props.getCurrentUser(),
        minDate: this.state.visitDateFrom,
        maxDate: this.state.visitDateTo,
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
      .then(data => this.setState({ data }))
      .catch(err => {
        if (err.message === "400") {
          this.setState({ error: "Error with inputs." });
        } else {
          this.setState({ error: "Internal Server Error." });
        }
      });
  };

  renderCompanyNames = () => {
    return this.state.allCompanyNames.map((companyName, index) => {
      return (
        <option key={index} value={companyName[0]}>
          {companyName[0]}
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
                <th style={this.stickyHeader}>Theater</th>
                <th style={this.stickyHeader}>Address</th>
                <th style={this.stickyHeader}>Company</th>
                <th style={this.stickyHeader}>Visit Date</th>
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
