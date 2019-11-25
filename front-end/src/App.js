import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import AdminOnlyFunctionality from "./components/AdminOnlyFunctionality";
import UserRegistration from "./components/UserRegister";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/register" component={Register}>
              <Switch>
                <Route exact path="/register" component={Register}></Route>
                <Route
                  path="/register/userOnly"
                  component={UserRegistration}
                ></Route>
              </Switch>
            </Route>

            <Route
              path="/adminOnlyFunctionality"
              component={AdminOnlyFunctionality}
            >
              <Switch>
                <Route
                  exact
                  path="/adminOnlyFunctionality"
                  component={AdminOnlyFunctionality}
                ></Route>
                <Route
                  path="/adminonlyfunctionality/manageUser"
                  component={NotFound}
                ></Route>
                <Route
                  path="/adminonlyfunctionality/manageCompany"
                  component={NotFound}
                ></Route>
                <Route
                  path="/adminonlyfunctionality/createMovie"
                  component={NotFound}
                ></Route>
                <Route
                  path="/adminonlyfunctionality/exploreTheater"
                  component={NotFound}
                ></Route>
                <Route
                  path="/adminonlyfunctionality/visitHistory"
                  component={NotFound}
                ></Route>
              </Switch>
            </Route>

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
