import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManageUser extends Component {
  state = {
    username: "",
    status: "All",
    sortedByCol: null,
    order: 1,
    selected: null,
    showEmptyError: false,
    data: [
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "ang",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "bad",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "zxcv",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 2,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 1,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 5,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Manager",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "User",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "User",
        status: "Approved"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "User",
        status: "Declined"
      }
    ]
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

  handleApprove = () => {
    if (!this.state.selected) {
      this.setState({ showEmptyError: true });
    }

    // TODO: backend call
  };

  handleDecline = () => {
    if (!this.state.selected) {
      this.setState({ showEmptyError: true });
    }

    // TODO: backend call
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
    return this.state.data.map((user, index) => {
      const { username, creditCardCount, userType, status } = user;
      return (
        <tr key={index}>
          <td>
            <input
              id={index}
              type="radio"
              name="current_user"
              onClick={this.selectRow}
            />
          </td>
          <td>{username}</td>
          <td>{creditCardCount}</td>
          <td>{userType}</td>
          <td>{status}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>Manage User</h1>
          <p></p>

          <form onSubmit={this.handleSubmit}>
            <div className="grid-3-col">
              <div>
                <label htmlFor="username">Username</label>
                &nbsp;
                <input
                  type="text"
                  id="username"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div>
                <label htmlFor="status">Status</label>
                &nbsp;
                <select id="status" onChange={this.handleChange}>
                  <option defaultValue="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Declined">Declined</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary m-2">
                Filter
              </button>
            </div>
          </form>
        </div>

        <button className="btn btn-primary m-2" onClick={this.handleApprove}>
          Approve
        </button>
        <button className="btn btn-primary m-2" onClick={this.handleDecline}>
          Decline
        </button>

        {this.state.showEmptyError && (
          <div className="alert alert-danger">No row selected</div>
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
                  Username
                </th>
                <th onClick={() => this.sortData(1)} style={this.stickyHeader}>
                  Credit Card Count
                </th>
                <th onClick={() => this.sortData(2)} style={this.stickyHeader}>
                  User Type
                </th>
                <th onClick={() => this.sortData(3)} style={this.stickyHeader}>
                  Status
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

export default ManageUser;
