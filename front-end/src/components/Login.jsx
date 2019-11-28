import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { stat } from "fs";

class Login extends Component {
  // Only need to pass in the database for users
  state = {
    username: "",
    password: "",
    isCorrect: true,
    error: null
  };

  componentDidMount() {
    this.props.resetUser();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    fetch("http://localhost:5000/user_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(user => {
        if (user.status !== "approved") {
          this.setState({ error: "Not an approved user." });
          return;
        }

        this.props.updateUser(user.username);

        if (user.isAdmin) {
          if (user.isCustomer) {
            this.props.history.push("/adminCustomerFunctionality");
          } else {
            this.props.history.push("/adminOnlyFunctionality");
          }
        } else if (user.isManager) {
          if (user.isCustomer) {
            this.props.history.push("/managerCustomerFunctionality");
          } else {
            this.props.history.push("/managerOnlyFunctionality");
          }
        } else if (user.isCustomer) {
          this.props.history.push("/customerFunctionality");
        } else {
          this.props.history.push("/userFunctionality");
        }
      })
      .catch(err => {
        if (err.message === "400") {
          this.setState({ error: "Wrong username or password." });
        } else {
          this.setState({ error: "Internal Server Error." });
        }
      });
  };

  render() {
    return (
      <div className="center-div">
        <form onSubmit={this.handleSubmit}>
          <h1>Atlanta Movie Login</h1>
          <div className="InputField" style={{ marginTop: 20 }}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="InputField">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
            ></input>
          </div>

          {this.state.error && (
            <div className="alert alert-danger" style={{ marginTop: 10 }}>
              {this.state.error}
            </div>
          )}

          <div style={{ marginTop: 10 }}>
            <button
              type="submit"
              className="btn btn-secondary lighten-1 z-depth-0"
            >
              Login
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={{ pathname: "/register", state: { name: "testing" } }}>
              <button className="btn btn-secondary lighten-1 z-depth-0">
                Register
              </button>
            </Link>
          </div>
          {!this.state.isCorrect && "Username or password incorrect"}
        </form>
      </div>
    );
  }
}

export default Login;
