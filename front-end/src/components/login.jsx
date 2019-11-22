import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    console.log("Change");
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    console.log("Submit");
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div
        className="Login"
        style={{ textAlign: "center", lineHeight: 1.6, padding: 180 }}
      >
        <Form onSubmit={this.handleSubmit}>
          <h1>Atlanta Movie Login</h1>
          <div className="InputField">
            <label htmlFor="username">Username: </label>
            <input
              type="username"
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
          <div>
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/register">
              <button className="btn pink lighten-1 z-depth-0">Register</button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
