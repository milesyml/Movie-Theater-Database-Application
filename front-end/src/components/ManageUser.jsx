import React, { Component } from "react";

class ManageUser extends Component {
  state = {
    username: "",
    status: "All",
    data: [
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
      },
      {
        username: "minglong",
        creditCardCount: 3,
        userType: "Admin",
        status: "Pending"
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
  };

  handleApprove = () => {
    if (!this.state.selected) {
      this.setState({ showEmptyError: true });
    }
  };

  handleDecline = () => {
    if (!this.state.selected) {
      this.setState({ showEmptyError: true });
    }
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
        <div style={{ padding: 100, height: 200 }}>
          <h1>Manage User</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="grid-5-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              ></input>

              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option defaultValue="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Declined">Declined</option>
                <option value="Approved">Approved</option>
              </select>
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
                <th style={this.stickyHeader}>Username</th>
                <th style={this.stickyHeader}>Credit Card Count</th>
                <th style={this.stickyHeader}>User Type</th>
                <th style={this.stickyHeader}>Status</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageUser;
