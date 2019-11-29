import React, { Component } from "react";

class ManageUser extends Component {
  state = {
    username: "",
    status: "All",
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
    fetch("http://localhost:5000/admin_filter_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        status: this.state.status,
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
      .catch(err => this.setState({ error: "Internal Server Error." }));
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: false });
    fetch("http://localhost:5000/admin_filter_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        status: this.state.status,
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
      .catch(err => this.setState({ error: "Internal Server Error." }));
  };

  handleApproveOrDecline = url => {
    this.setState({ error: null });

    if (!this.state.selected) {
      this.setState({ showEmptyError: true });
      return;
    }

    fetch("http://localhost:5000/" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.selected.username
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response;
        }
      })
      .then(response => this.componentDidMount())
      .catch(err => {
        if (err.message === "400") {
          this.setState({ error: "Unable to decline selected row." });
        } else {
          this.setState({ error: "Internal Server Error." });
        }
      });
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

        <button
          className="btn btn-primary m-2"
          onClick={() => this.handleApproveOrDecline("admin_approve_user")}
        >
          Approve
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.handleApproveOrDecline("admin_decline_user")}
        >
          Decline
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
                  onClick={() => this.sortData("username")}
                  style={this.stickyHeader}
                >
                  Username
                </th>
                <th
                  onClick={() => this.sortData("creditCardCount")}
                  style={this.stickyHeader}
                >
                  Credit Card Count
                </th>
                <th
                  onClick={() => this.sortData("userType")}
                  style={this.stickyHeader}
                >
                  User Type
                </th>
                <th
                  onClick={() => this.sortData("status")}
                  style={this.stickyHeader}
                >
                  Status
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

export default ManageUser;
