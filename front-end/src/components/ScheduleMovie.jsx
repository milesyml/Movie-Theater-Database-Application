import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class ScheduleMovie extends Component {
  state = {
    Name: "",
    rday: "",
    pday: "",
    data: [],
    error: null,
    success: null
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    fetch("http://localhost:5000/manager_filter_th", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        manUsername: this.props.getCurrentUser(),
        movName: "",
        minMovDuration: "",
        maxMovDuration: "",
        minMovReleaseDate: "",
        maxMovReleaseDate: "",
        minMovPlayDate: "",
        maxMovPlayDate: "",
        includeNotPlayed: 1
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        this.setState({
          data,
          Name: data[0] ? data[0].movName : "",
          rday: data[0]
            ? new Date(
                data[0].movReleaseDate.match(
                  "[0-9]{2}[ ][a-zA-Z]{3}[ ][0-9]{1,}"
                )[0]
              )
                .toISOString()
                .slice(0, 10)
            : ""
        });
      })
      .catch(err => {
        this.setState({ error: "Internal Server Error." });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleNameChange = e => {
    this.setState({
      Name: this.state.data[e.target.value].movName,
      rday: new Date(
        this.state.data[e.target.value].movReleaseDate.match(
          "[0-9]{2}[ ][a-zA-Z]{3}[ ][0-9]{1,}"
        )[0]
      )
        .toISOString()
        .slice(0, 10)
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null, success: null });
    fetch("http://localhost:5000/manager_schedule_mov", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        manName: this.props.getCurrentUser(),
        movName: this.state.Name,
        releaseDate: this.state.rday,
        playDate: this.state.pday
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response;
        }
      })
      .then(message =>
        this.setState({
          succes: "Successfully scheduled movie."
        })
      )
      .then(something => this.getMovies())
      .catch(err => {
        if (err.message === "400") {
          this.setState({
            error: "Please check that play date is after release date."
          });
        } else {
          this.setState({ error: "Internal Server Error" });
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

  renderMovieNames = () => {
    return this.state.data.map((movie, index) => {
      return (
        <option key={index} value={index}>
          {movie.movName}
        </option>
      );
    });
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
            <select id="Name" onChange={this.handleNameChange}>
              {this.renderMovieNames()}
            </select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="releaseDate" style={{ padding: 10 }}>
              Release Date:{" "}
            </label>
            <span id="releaseDate">
              {new Date(this.state.rday).toLocaleDateString()}
            </span>
          </div>
          <div>
            <label htmlFor="playDate" style={{ padding: 10 }}>
              Play Date:{" "}
            </label>
            <input type="date" id="pday" onChange={this.handleChange}></input>
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

export default ScheduleMovie;
