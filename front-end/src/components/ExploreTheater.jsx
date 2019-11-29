import React, { Component } from "react";

class ExploreTheater extends Component {
  state = {
    theaterName: "All",
    companyName: "All",
    city: "",
    state: "All",
    visitDate: "",
    allTheaterNames: [],
    allCompanyNames: [],
    selected: null,
    showEmptyError: false,
    showNoVisitDateError: false,
    data: [],
    error: null,
    visitErr: null,
    visitOk: null
  };

  stickyHeader = {
    position: "sticky",
    top: 0
  };

  componentDidMount() {
    fetch("http://localhost:5000/screen22_get_all", {
      method: "GET"
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
          allTheaterNames: data[0],
          allCompanyNames: data[1]
        });
      })
      .then(something => this.filterTheater())
      .catch(err => this.setState({ error: "Internal Server Error." }));
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null, visitOk: null, visitErr: null });
    this.filterTheater();
  };

  filterTheater = () => {
    this.setState({ error: null, visitOk: null, visitErr: null });
    fetch("http://localhost:5000/user_filter_th", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        thName: this.state.theaterName,
        comName: this.state.companyName,
        city: this.state.city,
        state: this.state.state
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

  handleVisitDateChange = e => {
    this.setState({
      showNoVisitDateError: false,
      [e.target.id]: e.target.value
    });
  };

  logVisit = () => {
    if (!this.state.selected && this.state.visitDate === "") {
      this.setState({ showEmptyError: true, showNoVisitDateError: true });
    } else if (!this.state.selected) {
      this.setState({ showEmptyError: true });
    } else if (this.state.visitDate === "") {
      this.setState({ showNoVisitDateError: true });
    } else {
      fetch("http://localhost:5000/user_visit_th", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          thName: this.state.selected.theater,
          comName: this.state.selected.company,
          date: this.state.visitDate,
          username: this.props.getCurrentUser()
        })
      })
        .then(response => {
          console.log(response);
          console.log(response.ok);
          if (!response.ok) {
            throw Error(response.status);
          } else {
            return response;
          }
        })
        .then(something => this.setState({ visitOk: "Visit added." }))
        .catch(err => this.setState({ visitErr: "Internal Server Error." }));
    }
  };

  selectRow = e => {
    const newSelected = this.state.data[e.target.id];
    this.setState({ selected: newSelected, showEmptyError: false });
  };

  renderData = () => {
    return this.state.data.map((th, index) => {
      const { theater, address, company } = th;
      return (
        <tr key={index}>
          <td>
            <input
              id={index}
              type="radio"
              name="current_theater"
              onClick={this.selectRow}
            />
          </td>
          <td>{theater}</td>
          <td>{address}</td>
          <td>{company}</td>
        </tr>
      );
    });
  };

  renderTheaterNames = () => {
    return this.state.allTheaterNames.map((theaterName, index) => {
      return (
        <option key={index} value={theaterName}>
          {theaterName}
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

  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: 50, marginBottom: 10 }}>
          <h1>Explore Theater</h1>
          <p></p>

          <form onSubmit={this.handleSubmit}>
            <div className="grid-2-col-2-row-22">
              <div>
                <label htmlFor="theaterName">Theater Name</label>
                &nbsp;
                <select id="theaterName" onChange={this.handleChange}>
                  <option defaultValue="ALL">All</option>
                  {this.renderTheaterNames()}
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
                <th style={this.stickyHeader}>Theater</th>
                <th style={this.stickyHeader}>Address</th>
                <th style={this.stickyHeader}>Company</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>
        &nbsp;
        {this.state.visitErr && (
          <div className="alert alert-danger">{this.state.visitErr}</div>
        )}
        {this.state.visitOk && (
          <div className="alert alert-success">{this.state.visitOk}</div>
        )}
        {this.state.showEmptyError && (
          <div className="alert alert-danger">No row selected</div>
        )}
        &nbsp;
        {this.state.showNoVisitDateError && (
          <div className="alert alert-danger">No visit date selected</div>
        )}
        <div>
          <button
            className="btn btn-primary m-2"
            onClick={this.props.history.goBack}
          >
            Back
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label htmlFor="visitDate">Visit Date</label>
          &nbsp;
          <input
            type="date"
            style={{ width: 155 }}
            id="visitDate"
            onChange={this.handleVisitDateChange}
          ></input>
          <button className="btn btn-primary m-2" onClick={this.logVisit}>
            Log Visit
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ExploreTheater;
