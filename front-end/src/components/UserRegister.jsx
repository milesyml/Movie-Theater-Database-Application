import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class UserRegistration extends Component {
  state = {};

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

  style = {
    padding: 10
  };

  render() {
    return (
      <div className="userRegister" style={{ lineHeight: 1.6, padding: 180 }}>
        <h1>User Registration</h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="InputField" style={this.style}>
            <label htmlFor="firstName">First Name: </label>
            <input
              type="firstName"
              id="firstName"
              onChange={this.handleChange}
            ></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="lastName"
              id="lastName"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="InputField" style={this.style}>
            <label htmlFor="username">Username: </label>
            <input
              type="username"
              id="username"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="InputField" style={this.style}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
            ></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <Link to="/register">
              <button className="btn pink lighten-1 z-depth-0">Back</button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn pink lighten-1 z-depth-0">Register</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default UserRegistration;
