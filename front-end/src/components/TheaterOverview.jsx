import React, { Component } from "react";

class TheaterOverview extends Component {
  state = {
    movieName: "",
    movieDurationFrom: "",
    movieDurationTo: "",
    movieReleaseDateFrom: "",
    movieReleaseDateTo: "",
    moviePlayDateFrom: "",
    moviePlayDateTo: "",
    onlyIncludeNotPlayed: 0,
    data: [],
    error: null
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  componentDidMount() {
    fetch("http://localhost:5000/manager_filter_th", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        manUsername: this.props.getCurrentUser(),
        movName: this.state.movieName,
        minMovDuration: this.state.movieDurationFrom,
        maxMovDuration: this.state.movieDurationTo,
        minMovReleaseDate: this.state.movieReleaseDateFrom,
        maxMovReleaseDate: this.state.movieReleaseDateTo,
        minMovPlayDate: this.state.moviePlayDateFrom,
        maxMovPlayDate: this.state.moviePlayDateTo,
        includeNotPlayed: this.state.onlyIncludeNotPlayed
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
        this.setState({ data });
      })
      .catch(err => {
        if (err.message === "400") {
          this.setState({ error: "Error with inputs." });
        } else {
          this.setState({ error: "Internal Server Error." });
        }
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.componentDidMount();
  };

  toggleCheckbox = e => {
    this.setState({ [e.target.id]: !this.state[e.target.id] ? 1 : 0 });
  };

  renderData = () => {
    return this.state.data.map((movie, index) => {
      const { movName, movDuration, movReleaseDate, movPlayDate } = movie;
      console.log(movReleaseDate);
      return (
        <tr key={index}>
          <td>{movName}</td>
          <td>{movDuration}</td>
          <td>
            {movReleaseDate.match("[0-9]{2}[ ][a-zA-Z]{3}[ ][0-9]{4}")[0]}
          </td>
          <td>
            {movPlayDate
              ? movPlayDate.match("[0-9]{2}[ ][a-zA-Z]{3}[ ][0-9]{4}")[0]
              : ""}
          </td>
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
