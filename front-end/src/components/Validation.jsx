import React, { Component } from "react";

class Validation extends Component {
  state = {};
  static isPassword = input => {
    if (input.length >= 8) {
      return true;
    }
    return false;
  };

  static isSame = (password, confirmPassword) => {
    if (password == confirmPassword) return true;
    return false;
  };
  render() {
    return;
  }

  static isCreditCard = creditcard => {
    if (isNaN(creditcard) != true && creditcard.length == 16) {
      return true;
    }
    return false;
  };

  static isZipcode = zipcode => {
    if (isNaN(zipcode) != true && zipcode.length == 5) {
      return true;
    }
    return false;
  };
}

export default Validation;
