import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

class HomeScreen extends Component {
  state = {};
  login = () => {
    console.log("Submit");
  };

  register = () => {
    console.log("Register");
  };

  render() {
    return (
      <div
        className="Login"
        style={{ textAlign: "center", lineHeight: 1.6, padding: 180 }}
      >
        <h1>Atlanta Movie Login</h1>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="username" placeholder="Username" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <ButtonToolbar>
            <button onClick={this.login}>Login</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={this.register}>Register</button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

export default HomeScreen;
