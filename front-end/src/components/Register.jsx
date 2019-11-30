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
    // console.log(this.props.location.state);
    return (
      <div className="center-div">
        <h1>Register Navigation</h1>
        <Link to={"/register/userOnly"}>
          <Button style={this.btnStyle}>User Only</Button>
        </Link>
        <Link to={"/register/customerOnly"}>
          <Button style={this.btnStyle}>Customer Only</Button>
        </Link>
        <Link to={"/register/managerOnly"}>
          <Button style={this.btnStyle}>Manager Only</Button>
        </Link>
        <Link to={"/register/managerCustomer"}>
          <Button style={this.btnStyle}>Manager Customer</Button>
        </Link>
        <Link to={"/"}>
          <Button style={this.btnStyle}>Back</Button>
        </Link>
      </div>
    );
  }
}

export default Register;
