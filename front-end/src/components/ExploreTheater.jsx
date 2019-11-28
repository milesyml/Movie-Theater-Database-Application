import React, { Component } from "react";
import { Link } from "react-router-dom";

class ExploreTheater extends Component {
  state = {
    theaterName: "All",
    companyName: "All",
    city: "",
    state: "All",
    visitDate: "",
    allTheaterNames: ["abdsf", "Asdfasd", "asdabasdfga"],
    allCompanyNames: ["asdbas", "Asdfd", "avsdc"],
    selected: null,
    showEmptyError: false,
    showNoVisitDateError: false,
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
    }

    // TODO: backend call
  };

  selectRow = e => {
    const newSelected = this.state.data[e.target.id];
    this.setState({ selected: newSelected, showEmptyError: false });
  };

  renderData = () => {
    return this.state.data.map((theater, index) => {
      const { theaterName, address, company } = theater;
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
          <td>{theaterName}</td>
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
        {this.state.showEmptyError && (
          <div className="alert alert-danger">No row selected</div>
        )}
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
