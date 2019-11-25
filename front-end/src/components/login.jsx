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
    // fetch from server side and then go to website.
    this.props.history.push("/AdminOnlyFunctionality");
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
            <button
              type="submit"
              className="btn btn-secondary lighten-1 z-depth-0"
            >
              Login
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/register">
              <button className="btn btn-secondary lighten-1 z-depth-0">
                Register
              </button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
