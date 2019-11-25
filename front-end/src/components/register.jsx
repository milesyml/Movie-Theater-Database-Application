import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  btnStyle = {
    display: "block",
    textAlign: "center",
    padding: 10,
    margin: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%"
  };

  render() {
    return (
      <div className="center-div">
        <h1>Register Navigation</h1>
        <Link to={"/register/userOnly"}>
          <Button style={this.btnStyle}>User Only</Button>
        </Link>
        <Button style={this.btnStyle}>Customer Only</Button>
        <Button style={this.btnStyle}>Manager Only</Button>
        <Button style={this.btnStyle}>Manager Customer</Button>
        <Link to={"/"}>
          <Button style={this.btnStyle}>Back</Button>
        </Link>
      </div>
    );
  }
}

export default Register;
