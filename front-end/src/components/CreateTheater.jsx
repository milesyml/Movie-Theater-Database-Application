import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
class CreateTheater extends Component {
  state = {
    theaterName: "",
    companyName: "",
    allCompanyNames: [],
    allManagerNames: [],
    address: "",
    city: "",
    state: "AL",
    zipcode: "",
    manager: "",
    capacity: "",
    error: null,
    success: null
  };

  componentDidMount() {
    fetch("http://localhost:5000/get_companies", {
      method: "GET"
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data =>
        this.setState({ allCompanyNames: data, companyName: data[0][0] })
      )
      .then(something => this.fetchEligibleManagers())
      .catch(err => this.setState({ error: "Internal Server Error." }));
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null, success: null });
    fetch("http://localhost:5000/admin_create_theater", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        thName: this.state.theaterName,
        comName: this.state.companyName,
        street: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipcode,
        capacity: this.state.capacity,
        managerUser: this.state.manager
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
        this.setState({ success: "Successfully created theater." })
      )
      .then(something => this.fetchEligibleManagers())
      .catch(err => {
        if (err.message === "400") {
          this.setState({ error: "Please check your inputs." });
        } else {
          this.setState({ error: "Internal Server Error." });
        }
      });
  };

  handleCompanyChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value,
        error: null,
        success: null
      },
      () => this.fetchEligibleManagers()
    );
  };

  fetchEligibleManagers = () => {
    fetch("http://localhost:5000/get_eligible_managers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comName: this.state.companyName
      })
    })
      .then(response => {
        console.log(response);

        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data =>
        this.setState({
          allManagerNames: data,
          manager: data.length === 0 ? "" : data[0].username
        })
      )
      .catch(err => this.setState({ error: "Internal Server Error." }));
  };

  style = {
    padding: 10
  };

  btnStyle = {
    textAlign: "center",
    padding: 10,
    margin: 10
  };

  renderCompanyNames = () => {
    return this.state.allCompanyNames.map((companyName, index) => {
      return (
        <option key={index} value={companyName[0]}>
          {companyName[0]}
        </option>
      );
    });
  };

  renderManagerNames = () => {
    return this.state.allManagerNames.map((managerName, index) => {
      return (
        <option key={index} value={managerName.username}>
          {managerName.fullName}
        </option>
      );
    });
  };

  render() {
    return (
      <div
        className="Create Theater"
        style={{ lineHeight: 1.6, padding: 80, justifyContent: "center" }}
      >
        <h1>Create Theater</h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="InputField" style={this.style}>
            <label htmlFor="theaterName" style={{ padding: 10 }}>
              Name:{" "}
            </label>
            <input
              type="theaterName"
              id="theaterName"
              onChange={this.handleChange}
            ></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="companyName">Company Name</label>
            &nbsp;
            <select id="companyName" onChange={this.handleCompanyChange}>
              {this.renderCompanyNames()}
            </select>
          </div>
          <div>
            <label htmlFor="address" style={{ padding: 10 }}>
              Street Address:{" "}
            </label>
            <input
              type="address"
              id="address"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="city" style={{ padding: 10 }}>
              City:{" "}
            </label>
            <input type="city" id="city" onChange={this.handleChange}></input>
            <label htmlFor="state" style={{ padding: 10 }}>
              State:{" "}
            </label>
            <select id="state" onChange={this.handleChange}>
              <option defaultValue="AL">AL</option>
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
            <label htmlFor="zipcode" style={{ padding: 10 }}>
              Zipcode:{" "}
            </label>
            <input
              type="text"
              id="zipcode"
              maxLength="5"
              size="6"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="capacity" style={{ padding: 10 }}>
              Capacity:{" "}
            </label>
            <input
              type="text"
              id="capacity"
              maxLength="5"
              size="6"
              onChange={this.handleChange}
            ></input>
            <label htmlFor="manager" style={{ padding: 10 }}>
              Manager:{" "}
            </label>
            <select id="manager" onChange={this.handleChange}>
              {this.renderManagerNames()}
            </select>
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

export default CreateTheater;
