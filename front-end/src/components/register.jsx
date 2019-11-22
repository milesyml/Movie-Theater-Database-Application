import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

class Register extends Component {
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
        <h1>Register Navigation</h1>
      </div>
    );
  }
}

export default Register;
