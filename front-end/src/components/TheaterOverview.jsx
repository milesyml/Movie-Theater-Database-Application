import React, { Component } from "react";
import { Link } from "react-router-dom";

class TheaterOverview extends Component {
  state = {
    movieName: "",
    movieDurationFrom: null,
    movieDurationTo: null,
    movieReleaseDateFrom: null,
    movieReleaseDateTo: null,
    moviePlayDateFrom: null,
    moviePlayDateTo: null,
    onlyIncludeNotPlayed: false,
    data: [
      {
        movieName: "minglong",
        duration: 3,
        releaseData: "Admin",
        playDate: "Pending"
      },
      {
        movieName: "ang",
        duration: 3,
        releaseData: "Admin",
        playDate: "Pending"
      },
      {
        movieName: "bad",
        duration: 3,
        releaseData: "Admin",
        playDate: "Pending"
      },
      {
        movieName: "zxcv",
        duration: 3,
        releaseData: "Admin",
        playDate: "Pending"
      },
      {
        movieName: "minglong",
        duration: 2,
        releaseData: "Admin",
        playDate: "Pending"
      },
      {
        movieName: "minglong",
        duration: 1,
        releaseData: "Admin",
        playDate: "Pending"
      },
      {
        movieName: "minglong",
        duration: 5,
        releaseData: "Admin",
        playDate: "Pending"
      },
      {
        movieName: "minglong",
        duration: 3,
        releaseData: "Manager",
        playDate: "Pending"
      },
      {
        movieName: "minglong",
        duration: 3,
        releaseData: "User",
        playDate: "Pending"
      },
      {
        movieName: "minglong",
        duration: 3,
        releaseData: "User",
        playDate: "Approved"
      },
      {
        movieName: "minglong",
        duration: 3,
        releaseData: "User",
        playDate: "Declined"
      }
    ]
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Submit");
    console.log(this.state);

    // TODO: backend call
  };

  toggleCheckbox = e => {
    this.setState({ [e.target.id]: !this.state[e.target.id] });
  };

  renderData = () => {
    return this.state.data.map((movie, index) => {
      const { movieName, duration, releaseData, playDate } = movie;
      return (
        <tr key={index}>
          <td>{movieName}</td>
          <td>{duration}</td>
          <td>{releaseData}</td>
          <td>{playDate}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>Theater Overview</h1>
          <p></p>

          <form onSubmit={this.handleSubmit}>
            <div className="grid-2-col-3-row">
              <div>
                <label htmlFor="movieName">Movie Name</label>
                &nbsp;
                <input
                  type="text"
                  id="movieName"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div>
                <label htmlFor="movieDurationFrom">Movie Duration</label>
                &nbsp;
                <input
                  type="text"
                  id="movieDurationFrom"
                  size="3"
                  onChange={this.handleChange}
                ></input>
                &nbsp;
                <span>--</span>
                &nbsp;
                <input
                  type="text"
                  id="movieDurationTo"
                  size="3"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="item-span-2-cols">
                <label htmlFor="movieReleaseDateFrom">Movie Release Date</label>
                &nbsp;
                <input
                  type="date"
                  id="movieReleaseDateFrom"
                  style={{ width: 155 }}
                  onChange={this.handleChange}
                ></input>
                &nbsp;
                <span>--</span>
                &nbsp;
                <input
                  type="date"
                  id="movieReleaseDateTo"
                  style={{ width: 155 }}
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="item-span-2-cols">
                <label htmlFor="moviePlayDateFrom">Movie Play Date</label>
                &nbsp;
                <input
                  type="date"
                  id="moviePlayDateFrom"
                  style={{ width: 155 }}
                  onChange={this.handleChange}
                ></input>
                &nbsp;
                <span>--</span>
                &nbsp;
                <input
                  type="date"
                  id="moviePlayDateTo"
                  style={{ width: 155 }}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                id="onlyIncludeNotPlayed"
                onChange={this.toggleCheckbox}
              ></input>
              &nbsp;
              <span>Only Include Not Played Movies</span>
            </div>

            <button type="submit" className="btn btn-primary m-2">
              Filter
            </button>
          </form>
        </div>

        <div style={{ height: 400, overflow: "auto" }}>
          <table
            className="table table-bordered table-hover"
            style={{
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th style={this.stickyHeader}>Movie Name</th>
                <th style={this.stickyHeader}>Duration</th>
                <th style={this.stickyHeader}>Release Date</th>
                <th style={this.stickyHeader}>Play Date</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>

        <button
          className="btn btn-primary m-2"
          onClick={this.props.history.goBack}
        >
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default TheaterOverview;
