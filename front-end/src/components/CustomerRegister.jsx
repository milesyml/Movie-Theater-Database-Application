import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import CreditCardList from "./CreditCardList";
import Validation from "./Validation";

class CustomerRegistration extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    my_list: [],
    max_number: 5,
    tempCardNumber: "",
    validPassword: true,
    samePassword: true,
    validCreditCard: true
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
  };
  handleAddCard = () => {
    if (this.state.my_list.length < this.state.max_number) {
      if (this.state.tempCardNumber != "") {
        var new_list = this.state.my_list;
        this.setState({
          validCreditCard: Validation.isCreditCard(this.state.tempCardNumber)
        });
        if (!Validation.isCreditCard(this.state.tempCardNumber)) {
          return;
        }
        new_list.push(this.state.tempCardNumber);

        this.setState({ my_list: new_list });
      }
      console.log(this.state.my_list);
    }
  };

  removeCard = event => {
    var new_list = this.state.my_list;
    new_list.splice(event.target.id, 1);
    this.setState({ my_list: new_list });
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
        className="customerRegister"
        style={{ lineHeight: 1.6, padding: 80, justifyContent: "center" }}
      >
        <h1>Customer-Only Registration</h1>
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
          <div style={{ padding: 20 }}>Credit Card #:</div>
          <CreditCardList
            my_list={this.state.my_list}
            removeCard={this.removeCard}
            handleAddCard={this.handleAddCard}
            handleChange={this.handleChange}
          ></CreditCardList>

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
          {!this.state.validCreditCard && <p>Invalid creditcard</p>}
        </Form>
      </div>
    );
  }
}

export default CustomerRegistration;
