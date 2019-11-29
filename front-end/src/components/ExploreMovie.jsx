import React, { Component } from "react";

class ExploreMovie extends Component {
  state = {
    movieName: "All",
    companyName: "All",
    city: "",
    state: "All",
    card: "",
    moviePlayDateFrom: "",
    moviePlayDateTo: "",
    allMovieNames: [],
    allCompanyNames: [],
    allCards: [],
    selected: null,
    showEmptyError: false,
    showNoCardError: false,
    data: [],
    error: null,
    viewErr: null,
    viewOk: null
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  componentDidMount() {
    fetch("http://localhost:5000/screen20_get_all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.props.getCurrentUser()
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
          allMovieNames: data[0],
          allCompanyNames: data[1],
          allCards: data[2]
        });
      })
      .then(something => this.filterMovie())
      .catch(err => this.setState({ error: "Internal Server Error." }));
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleCardChange = e => {
    if (e.target.value !== "") {
      this.setState({
        [e.target.id]: e.target.value,
        showNoCardError: false
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null, viewErr: null, viewOk: null });
    this.filterMovie();
  };

  filterMovie = () => {
    fetch("http://localhost:5000/customer_filter_mov", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movName: this.state.movieName,
        comName: this.state.companyName,
        city: this.state.city,
        state: this.state.state,
        minMovPlayDate: this.state.moviePlayDateFrom,
        maxMovPlayDate: this.state.moviePlayDateTo
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
  };

  viewMovie = () => {
    this.setState({ error: null, viewErr: null, viewOk: null });
    if (!this.state.selected && this.state.card === "") {
      this.setState({ showEmptyError: true, showNoCardError: true });
    } else if (!this.state.selected) {
      this.setState({ showEmptyError: true });
    } else if (this.state.card === "") {
      this.setState({ showNoCardError: true });
    } else {
      fetch("http://localhost:5000/customer_view_movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cardNum: this.state.card,
          movName: this.state.selected.movName,
          releaseDate: this.state.selected.movReleaseDate,
          playDate: this.state.selected.movPlayDate,
          thName: this.state.selected.thName,
          comName: this.state.selected.comName
        })
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.status);
          } else {
            return response;
          }
        })
        .then(something => this.setState({ viewOk: "View added." }))
        .catch(err => {
          if (err.message === "400") {
            this.setState({
              viewErr:
                "Card has been used or there are already 3 movies viewed on this day."
            });
          } else {
            this.setState({ viewErr: "Internal Server Error." });
          }
        });
    }
  };

  selectRow = e => {
    const newSelected = this.state.data[e.target.id];
    this.setState({ selected: newSelected, showEmptyError: false });
  };

  renderData = () => {
    return this.state.data.map((movie, index) => {
      const {
        movName,
        thName,
        thStreet,
        thCity,
        thState,
        thZipcode,
        comName,
        movPlayDate
      } = movie;
      const address =
        thStreet + ", " + thCity + ", " + thState + " " + thZipcode;
      return (
        <tr key={index}>
          <td>
            <input
              id={index}
              type="radio"
              name="current_movie"
              onClick={this.selectRow}
            />
          </td>
          <td>{movName}</td>
          <td>{thName}</td>
          <td>{address}</td>
          <td>{comName}</td>
          <td>{movPlayDate.match("[0-9]{2}[ ][a-zA-Z]{3}[ ][0-9]{4}")[0]}</td>
        </tr>
      );
    });
  };

  renderMovieNames = () => {
    return this.state.allMovieNames.map((movieName, index) => {
      return (
        <option key={index} value={movieName}>
          {movieName}
        </option>
      );
    });
  };

  renderCompanyNames = () => {
    return this.state.allCompanyNames.map((companyName, index) => {
      return (
        <option key={index} value={companyName}>
          {companyName}
        </option>
      );
    });
  };

  renderCardNumbers = () => {
    return this.state.allCards.map((card, index) => {
      return (
        <option key={index} value={card}>
          {card}
        </option>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>Explore Movie</h1>
          <p></p>

          <form onSubmit={this.handleSubmit}>
            <div className="grid-2-col-3-row">
              <div>
                <label htmlFor="movieName">Movie Name</label>
                &nbsp;
                <select id="movieName" onChange={this.handleChange}>
                  <option defaultValue="ALL">All</option>
                  {this.renderMovieNames()}
                </select>
              </div>

              <div>
                <label htmlFor="companyName">Company Name</label>
                &nbsp;
                <select id="companyName" onChange={this.handleChange}>
                  <option defaultValue="ALL">All</option>
                  {this.renderCompanyNames()}
                </select>
              </div>

              <div>
                <label htmlFor="city">City</label>
                &nbsp;
                <input
                  type="text"
                  id="city"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div>
                <label htmlFor="state">State</label>
                &nbsp;
                <select id="state" onChange={this.handleChange}>
                  <option defaultValue="ALL">All</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                </select>
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

            <button type="submit" className="btn btn-primary m-2">
              Filter
            </button>
          </form>
        </div>
        {this.state.error && (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
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
                <th style={this.stickyHeader}></th>
                <th style={this.stickyHeader}>Movie</th>
                <th style={this.stickyHeader}>Theater</th>
                <th style={this.stickyHeader}>Address</th>
                <th style={this.stickyHeader}>Company</th>
                <th style={this.stickyHeader}>Play Date</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>
        &nbsp;
        {this.state.viewErr && (
          <div className="alert alert-danger">{this.state.viewErr}</div>
        )}
        {this.state.viewOk && (
          <div className="alert alert-success">{this.state.viewOk}</div>
        )}
        {this.state.showEmptyError && (
          <div className="alert alert-danger">No row selected</div>
        )}
        &nbsp;
        {this.state.showNoCardError && (
          <div className="alert alert-danger">No card selected</div>
        )}
        <div>
          <button
            className="btn btn-primary m-2"
            onClick={this.props.history.goBack}
          >
            Back
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label htmlFor="card">Card Number</label>
          &nbsp;
          <select id="card" onChange={this.handleCardChange}>
            <option defaultValue=""></option>
            {this.renderCardNumbers()}
          </select>
          <button className="btn btn-primary m-2" onClick={this.viewMovie}>
            View
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ExploreMovie;
