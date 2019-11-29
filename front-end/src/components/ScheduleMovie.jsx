import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class ScheduleMovie extends Component {
  state = {
    Name: "",
    rday: "",
    pday: ""
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
        className="scheduleMovie"
        style={{ lineHeight: 1.6, padding: 80, justifyContent: "center" }}
      >
        <h1>Schedule Movie</h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="InputField" style={this.style}>
            <label htmlFor="Name" style={{ padding: 10 }}>
              Name:{" "}
            </label>
            <input type="Name" id="Name" onChange={this.handleChange}></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="releaseDate" style={{ padding: 10 }}>
              Release Date:{" "}
            </label>
            <input type="date" id="rday" onChange={this.handleChange}></input>
          </div>
          <div>
            <label htmlFor="playDate" style={{ padding: 10 }}>
              Play Date:{" "}
            </label>
            <input type="date" id="pday" onChange={this.handleChange}></input>
          </div>

          <div>
            <Link to="/">
              <Button style={this.btnStyle}>Back</Button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button style={this.btnStyle} onClick={this.handleSubmit}>
              Create
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default ScheduleMovie;
