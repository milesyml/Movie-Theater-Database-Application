import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { stat } from "fs";
import Validation from "./Validation";

class Login extends Component {
  // Only need to pass in the database for users
  state = {
    username: "",
    password: "",
    users: [
      ["morris", "morris"],
      ["dominic", "dominic"]
    ],
    isCorrect: true
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    console.log("Submit");
    e.preventDefault();
    console.log(this.state);
  };

  validation = () => {
    for (var i = 0; i < this.state.users.length; i++) {
      if (
        this.state.users[i][0] == this.state.username &&
        this.state.users[i][1] == this.state.password
      ) {
        return true;
      }
    }
    return false;
  };

  checkingSubmit = () => {
    if (this.validation()) {
      return (
        <Link to={"/adminOnlyFunctionality"}>
          <button
            type="submit"
            className="btn btn-secondary lighten-1 z-depth-0"
          >
            Login
          </button>
        </Link>
      );
    } else {
      return (
        <button
          type="submit"
          className="btn btn-secondary lighten-1 z-depth-0"
          onClick={this.handleErrorInput}
        >
          Login
        </button>
      );
    }
  };

  handleErrorInput = () => {
    this.setState({
      isCorrect: false
    });
    if (this.state.username === "" && this.state.password === "")
      this.setState({
        isCorrect: true
      });
    for (var i = 0; i < this.state.users.length; i++) {
      if (
        this.state.users[i][0] == this.state.username &&
        this.state.users[i][1] == this.state.password
      ) {
        this.setState({
          isCorrect: true
        });
      }
    }
  };

  render() {
    return (
      <div className="center-div">
        <Form style={{ width: 400, height: 200 }} onSubmit={this.handleSubmit}>
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
          <div style={{ marginTop: 10 }}>
            {this.checkingSubmit()}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={{ pathname: "/register", state: { name: "testing" } }}>
              <button className="btn btn-secondary lighten-1 z-depth-0">
                Register
              </button>
            </Link>
          </div>
          {!this.state.isCorrect && "Username or password incorrect"}
        </Form>
      </div>
    );
  }
}

export default Login;
