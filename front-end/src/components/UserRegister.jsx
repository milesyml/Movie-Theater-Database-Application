import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Validation from "./Validation";
class UserRegistration extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    validPassword: true,
    samePassword: true,
    error: null
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
    this.setState({
      validPassword: Validation.isPassword(this.state.password),
      samePassword: Validation.isSame(
        this.state.password,
        this.state.confirmPassword
      )
    });

    if (
      this.state.firstName == "" ||
      this.state.lastName == "" ||
      this.state.username == "" ||
      !Validation.isPassword(this.state.password) ||
      !Validation.isSame(this.state.password, this.state.confirmPassword)
    ) {
      console.log("error");
      return;
    }

    fetch("http://localhost:5000/user_register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
    })
      .then(response => {
        console.log(response.status);
        if (response.status != "200") {
          throw Error(response.status);
        } else {
          this.props.history.push("/");
          return response.json();
        }
      })

      .catch(err => {
        if (err.message === "400") {
          this.setState({ error: "Username Exists!" });
        } else {
          this.setState({ error: "Internal Server Error." });
        }
      });
  };

  style = {
    padding: 10
  };

  btnStyle = {
    textAlign: "center",
    padding: 10,
    margin: 10
  };

  render() {
    return (
      <div
        className="userRegister"
        style={{ lineHeight: 1.6, padding: 80, justifyContent: "center" }}
      >
        <h1>User Registration</h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="InputField" style={this.style}>
            <label htmlFor="firstName" style={{ padding: 10 }}>
              First Name:{" "}
            </label>
            <input
              type="firstName"
              id="firstName"
              onChange={this.handleChange}
            ></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="lastName" style={{ padding: 10 }}>
              Last Name:{" "}
            </label>
            <input
              type="lastName"
              id="lastName"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="InputField" style={this.style}>
            <label htmlFor="username" style={{ padding: 10 }}>
              Username:{" "}
            </label>
            <input
              type="username"
              id="username"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="InputField" style={this.style}>
            <label htmlFor="password" style={{ padding: 10 }}>
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
            ></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="confirmPassword" style={{ padding: 10 }}>
              Confirm Password:{" "}
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={this.handleChange}
            ></input>
          </div>
          {this.state.error && (
            <div className="alert alert-danger" style={{ marginTop: 10 }}>
              {this.state.error}
            </div>
          )}
          <div>
            <Link to="/register">
              <Button style={this.btnStyle}>Back</Button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button style={this.btnStyle} onClick={this.handleSubmit}>
              Register
            </Button>
          </div>
          {!this.state.validPassword && <p>Incorrect password input</p>}
          {!this.state.samePassword && <p>Password doesn't match</p>}
        </Form>
      </div>
    );
  }
}

export default UserRegistration;
