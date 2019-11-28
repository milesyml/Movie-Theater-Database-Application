import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManageCompany extends Component {
  state = {
    companyName: "",
    numCityCoveredFrom: null,
    numCityCoveredTo: null,
    numTheatersFrom: null,
    numTheatersTo: null,
    numEmployessFrom: null,
    numEmployessTo: null,
    sortedByCol: null,
    order: 1,
    data: [
      {
        companyName: "minglong",
        numCityCovered: 3,
        numTheaters: "Admin",
        numEmployee: "Pending"
      },
      {
        companyName: "ang",
        numCityCovered: 3,
        numTheaters: "Admin",
        numEmployee: "Pending"
      },
      {
        companyName: "bad",
        numCityCovered: 3,
        numTheaters: "Admin",
        numEmployee: "Pending"
      },
      {
        companyName: "zxcv",
        numCityCovered: 3,
        numTheaters: "Admin",
        numEmployee: "Pending"
      },
      {
        companyName: "minglong",
        numCityCovered: 2,
        numTheaters: "Admin",
        numEmployee: "Pending"
      },
      {
        companyName: "minglong",
        numCityCovered: 1,
        numTheaters: "Admin",
        numEmployee: "Pending"
      },
      {
        companyName: "minglong",
        numCityCovered: 5,
        numTheaters: "Admin",
        numEmployee: "Pending"
      },
      {
        companyName: "minglong",
        numCityCovered: 3,
        numTheaters: "Manager",
        numEmployee: "Pending"
      },
      {
        companyName: "minglong",
        numCityCovered: 3,
        numTheaters: "User",
        numEmployee: "Pending"
      },
      {
        companyName: "minglong",
        numCityCovered: 3,
        numTheaters: "User",
        numEmployee: "Approved"
      },
      {
        companyName: "minglong",
        numCityCovered: 3,
        numTheaters: "User",
        numEmployee: "Declined"
      }
    ],
    selected: null,
    showEmptyError: false
  };

  stickyHeader = {
    position: "sticky",
    top: 0
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

  sortData = index => {
    if (this.state.data.length === 0) {
      return;
    }

    const sortingKey = Object.keys(this.state.data[0])[index];
    const newData = [...this.state.data];

    if (this.state.sortedByCol === index) {
      newData.sort(this.compareValues(sortingKey, this.state.order * -1));
      this.setState({
        sortedByCol: index,
        order: this.state.order * -1,
        data: newData
      });
    } else {
      newData.sort(this.compareValues(sortingKey, 1));
      this.setState({ sortedByCol: index, order: 1, data: newData });
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
      const { companyName, numCityCovered, numTheaters, numEmployee } = company;
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
          <td>{companyName}</td>
          <td>{numCityCovered}</td>
          <td>{numTheaters}</td>
          <td>{numEmployee}</td>
        </tr>
      );
    });
  };

  renderCompanyNames = () => {
    return this.state.data.map((company, index) => {
      return (
        <option key={index} value={company.companyName}>
          {company.companyName}
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
          <div className="alert alert-danger">Nothing selected</div>
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
                <th onClick={() => this.sortData(0)} style={this.stickyHeader}>
                  Company Name
                </th>
                <th onClick={() => this.sortData(1)} style={this.stickyHeader}>
                  #CityCovered
                </th>
                <th onClick={() => this.sortData(2)} style={this.stickyHeader}>
                  #Theaters
                </th>
                <th onClick={() => this.sortData(3)} style={this.stickyHeader}>
                  #Employee
                </th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>

        <Link to="/adminOnlyFunctionality">
          <button className="btn btn-primary m-2">Back</button>
        </Link>
      </React.Fragment>
    );
  }
}

export default ManageCompany;
