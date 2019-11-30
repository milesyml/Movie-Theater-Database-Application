import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
class CreateMovie extends Component {
  state = {
    Name: "",
    Duration: "",
    rday: "",
    error: null,
    success: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null, success: null });
    fetch("http://localhost:5000/admin_create_mov", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.Name,
        duration: this.state.Duration,
        releaseDate: this.state.rday
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.statusText;
        }
      })
      .then(message =>
        this.setState({ success: "Successfully created movie." })
      )
      .catch(err => {
        if (err.message === "400") {
          this.setState({ error: "Please check your inputs." });
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
        className="Create Movie"
        style={{ lineHeight: 1.6, padding: 80, justifyContent: "center" }}
      >
        <h1>Create Movie</h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="InputField" style={this.style}>
            <label htmlFor="Name" style={{ padding: 10 }}>
              Name:{" "}
            </label>
            <input type="Name" id="Name" onChange={this.handleChange}></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="Duration" style={{ padding: 10 }}>
              Duration:{" "}
            </label>
            <input
              type="text"
              id="Duration"
              maxLength="3"
              size="4"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="releaseDate" style={{ padding: 10 }}>
              Release Date:{" "}
            </label>
            <input type="date" id="rday" onChange={this.handleChange}></input>
          </div>

          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
          {this.state.success && (
            <div className="alert alert-success">{this.state.success}</div>
          )}

          <div>
            <Button onClick={this.props.history.goBack} style={this.btnStyle}>
              Back
            </Button>
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

export default CreateMovie;
