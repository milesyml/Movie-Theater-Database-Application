import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

class CreditCardList extends Component {
  state = {};

  render() {
    return (
      <div>
        {this.props.my_list.map((item, i) => {
          return (
            <p key={i}>
              {item}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button id={i} onClick={this.props.removeCard} type="button">
                Remove
              </button>
            </p>
          );
        })}
        <input id="tempCardNumber" onChange={this.props.handleChange}></input>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" onClick={this.props.handleAddCard}>
          Add
        </button>
      </div>
    );
  }
}

export default CreditCardList;
