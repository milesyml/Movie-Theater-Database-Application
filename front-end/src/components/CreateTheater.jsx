import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
class CreateTheater extends Component {
  state = {
    Name: "",
    company: "4400TC",
    address: "",
    state: "AL",
    zipcode: "",
    manager: ""
  };

  handleChange = e => {
    console.log("Change");
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
        className="Create Theater"
        style={{ lineHeight: 1.6, padding: 80, justifyContent: "center" }}
      >
        <h1>Create Theater</h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="InputField" style={this.style}>
            <label htmlFor="Name" style={{ padding: 10 }}>
              Name:{" "}
            </label>
            <input type="Name" id="Name" onChange={this.handleChange}></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="company" style={{ padding: 10 }}>
              Company:{" "}
            </label>
            <select id="company" onChange={this.handleChange}>
              <option value="4400TC">4400TC</option>
              <option value="AITC">AITC</option>
              <option value="ATC">ATC</option>
              <option value="EZTC">EZTC</option>
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
            <label htmlFor="zipcode" style={{ padding: 10 }}>
              Zipcode:{" "}
            </label>
            <input
              type="zipcode"
              id="zipcode"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="capacity" style={{ padding: 10 }}>
              Capacity:{" "}
            </label>
            <input
              type="capacity"
              id="capacity"
              onChange={this.handleChange}
            ></input>
            <label htmlFor="manager" style={{ padding: 10 }}>
              Manager:{" "}
            </label>
            <select id="manager" onChange={this.handleChange}>
              <option value="4400TC">4400TC</option>
              <option value="AITC">AITC</option>
              <option value="ATC">ATC</option>
              <option value="EZTC">EZTC</option>
            </select>
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

export default CreateTheater;
