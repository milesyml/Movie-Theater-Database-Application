import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManageCompany extends Component {
  state = {
    companyName: "All",
    numCityCoveredFrom: "",
    numCityCoveredTo: "",
    numTheatersFrom: "",
    numTheatersTo: "",
    numEmployeesFrom: "",
    numEmployeesTo: "",
    sortedByCol: null,
    order: 1,
    selected: null,
    showEmptyError: false,
    data: [],
    error: null
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  componentDidMount() {
    fetch("http://localhost:5000/admin_filter_company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comName: this.state.companyName,
        minCity: this.state.numCityCoveredFrom,
        maxCity: this.state.numCityCoveredTo,
        minTheater: this.state.numTheatersFrom,
        maxTheater: this.state.numTheatersTo,
        minEmployee: this.state.numEmployeesFrom,
        maxEmployee: this.state.numEmployeesTo,
        sortBy: "",
        sortDirection: ""
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
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    fetch("http://localhost:5000/admin_filter_company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comName: this.state.companyName,
        minCity: this.state.numCityCoveredFrom,
        maxCity: this.state.numCityCoveredTo,
        minTheater: this.state.numTheatersFrom,
        maxTheater: this.state.numTheatersTo,
        minEmployee: this.state.numEmployeesFrom,
        maxEmployee: this.state.numEmployeesTo,
        sortBy: "",
        sortDirection: ""
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

  createTheater = () => {
    if (!this.state.selected) {
      this.setState({ showEmptyError: true });
      return;
    }

    this.props.history.push("/createTheater");
  };

  viewCompanyDetail = () => {
    if (!this.state.selected) {
      this.setState({ showEmptyError: true });
      return;
    }

    this.props.history.push(
      `/companyDetail/${this.state.selected.companyName}`
    );
  };

  sortData = sortingKey => {
    if (this.state.data.length === 0) {
      return;
    }

    const newData = [...this.state.data];

    if (this.state.sortedByCol === sortingKey) {
      newData.sort(this.compareValues(sortingKey, this.state.order * -1));
      this.setState({
        sortedByCol: sortingKey,
        order: this.state.order * -1,
        data: newData
      });
    } else {
      newData.sort(this.compareValues(sortingKey, 1));
      this.setState({ sortedByCol: sortingKey, order: 1, data: newData });
    }
  };

  compareValues = (key, order) => {
    return (a, b) => {
      if (a[key] < b[key]) {
        return -1 * order;
      } else if (a[key] > b[key]) {
        return 1 * order;
      } else {
        return 0;
      }
    };
  };

  selectRow = e => {
    const newSelected = this.state.data[e.target.id];
    this.setState({ selected: newSelected, showEmptyError: false });
  };

  renderData = () => {
    return this.state.data.map((company, index) => {
      const { comName, numCityCover, numTheater, numEmployee } = company;
      return (
        <tr key={index}>
          <td>
            <input
              id={index}
              type="radio"
              name="current_company"
              onClick={this.selectRow}
            />
          </td>
          <td>{comName}</td>
          <td>{numCityCover}</td>
          <td>{numTheater}</td>
          <td>{numEmployee}</td>
        </tr>
      );
    });
  };

  renderCompanyNames = () => {
    return this.state.data.map((company, index) => {
      return (
        <option key={index} value={company.comName}>
          {company.comName}
        </option>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>Manage Company</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="grid-3-col-2-row">
              <div>
                <label htmlFor="companyName">Company Name</label>
                &nbsp;
                <select id="companyName" onChange={this.handleChange}>
                  <option defaultValue="All">All</option>
                  {this.renderCompanyNames()}
                </select>
              </div>

              <div>
                <label htmlFor="numCityCoveredFrom"># City Covered</label>
                &nbsp;
                <input
                  type="text"
                  id="numCityCoveredFrom"
                  size="3"
                  onChange={this.handleChange}
                ></input>
                &nbsp;
                <span>--</span>
                &nbsp;
                <input
                  type="text"
                  id="numCityCoveredTo"
                  size="3"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="item item-1-col-2-row">
                <button type="submit" className="btn btn-primary m-2">
                  Filter
                </button>
              </div>

              <div>
                <label htmlFor="numTheatersFrom"># Theaters</label>
                &nbsp;
                <input
                  type="text"
                  id="numTheatersFrom"
                  size="3"
                  onChange={this.handleChange}
                ></input>
                &nbsp;
                <span>--</span>
                &nbsp;
                <input
                  type="text"
                  id="numTheatersTo"
                  size="3"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div>
                <label htmlFor="numEmployeesFrom"># Employees</label>
                &nbsp;
                <input
                  type="text"
                  id="numEmployeesFrom"
                  size="3"
                  onChange={this.handleChange}
                ></input>
                &nbsp;
                <span>--</span>
                &nbsp;
                <input
                  type="text"
                  id="numEmployeesTo"
                  size="3"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </form>
        </div>

        <button className="btn btn-primary m-2" onClick={this.createTheater}>
          Create Theater
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={this.viewCompanyDetail}
        >
          Detail
        </button>

        {this.state.showEmptyError && (
          <div className="alert alert-danger">No row selected</div>
        )}

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
                <th style={this.stickyHeader} />
                <th
                  onClick={() => this.sortData("comName")}
                  style={this.stickyHeader}
                >
                  Company Name
                </th>
                <th
                  onClick={() => this.sortData("numCityCover")}
                  style={this.stickyHeader}
                >
                  Number of Cities Covered
                </th>
                <th
                  onClick={() => this.sortData("numTheater")}
                  style={this.stickyHeader}
                >
                  Number of Theaters
                </th>
                <th
                  onClick={() => this.sortData("numEmployee")}
                  style={this.stickyHeader}
                >
                  Number of Employees
                </th>
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

export default ManageCompany;
