import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import AdminOnlyFunctionality from "./components/AdminOnlyFunctionality";
import ManageUser from "./components/ManageUser";
import UserRegistration from "./components/UserRegister";
import CustomerRegistration from "./components/CustomerRegister";
import ManagerRegistration from "./components/ManagerRegister";
import ManagerCustomerRegistration from "./components/ManagerCustomerRegister";
import CreateTheater from "./components/CreateTheater";
import CreateMovie from "./components/CreateMovie";
import ScheduleMovie from "./components/ScheduleMovie";
import ManageCompany from "./components/ManageCompany";
import CompanyDetail from "./components/CompanyDetail";
import TheaterOverview from "./components/TheaterOverview";
import ManagerOnlyFunctionality from "./components/ManagerOnlyFunctionality";
import CustomerFunctionality from "./components/CustomerFunctionality";
import ExploreMovie from "./components/ExploreMovie";
import ExploreTheater from "./components/ExploreTheater";
import ViewHistory from "./components/ViewHistory";
import VisitHistory from "./components/VisitHistory";
import AdminCustomerFunctionality from "./components/AdminCustomerFunctionality";
import ManagerCustomerFunctionality from "./components/ManagerCustomerFunctionality";
import UserFunctionality from "./components/UserFunctionality";


class App extends Component {
  state = { username: "" };

  resetUser = () => {
    this.setState({ username: "" });
  };

  updateUser = username => {
    this.setState({ username });
  };

  getCurrentUser = () => {
    return this.state.username;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login
                  {...props}
                  resetUser={this.resetUser}
                  updateUser={this.updateUser}
                />
              )}
            ></Route>
            <Route path="/register" component={Register}>
              <Switch>
                <Route exact path="/register" component={Register}></Route>
                <Route
                  path="/register/userOnly"
                  component={UserRegistration}
                ></Route>
                <Route
                  path="/register/customerOnly"
                  component={CustomerRegistration}
                ></Route>
                <Route
                  path="/register/managerOnly"
                  component={ManagerRegistration}
                ></Route>
                <Route
                  path="/register/managerCustomer"
                  component={ManagerCustomerRegistration}
                ></Route>
              </Switch>
            </Route>
            <Route
              path="/adminOnlyFunctionality"
              component={AdminOnlyFunctionality}
            ></Route>
            <Route path="/manageUser" component={ManageUser} />
            <Route path="/createTheater" component={CreateTheater}></Route>
            <Route path="/createMovie" component={CreateMovie}></Route>
            <Route path="/scheduleMovie" component={ScheduleMovie}></Route>

              render={props => (
                <AdminOnlyFunctionality
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />

            <Route
              path="/adminCustomerFunctionality"
              render={props => (
                <AdminCustomerFunctionality
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/managerOnlyFunctionality"
              render={props => (
                <ManagerOnlyFunctionality
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/managerCustomerFunctionality"
              render={props => (
                <ManagerCustomerFunctionality
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/customerFunctionality"
              render={props => (
                <CustomerFunctionality
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/userFunctionality"
              render={props => (
                <UserFunctionality
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/manageUser"
              render={props => (
                <ManageUser {...props} getCurrentUser={this.getCurrentUser} />
              )}
            />
            <Route
              path="/manageCompany"
              render={props => (
                <ManageCompany
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/companyDetail/:companyName"
              render={props => (
                <CompanyDetail
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/theaterOverview"
              render={props => (
                <TheaterOverview
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/exploreMovie"
              render={props => (
                <ExploreMovie {...props} getCurrentUser={this.getCurrentUser} />
              )}
            />
            <Route
              path="/exploreTheater"
              render={props => (
                <ExploreTheater
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              )}
            />
            <Route
              path="/viewHistory"
              render={props => (
                <ViewHistory {...props} getCurrentUser={this.getCurrentUser} />
              )}
            />
            <Route
              path="/visitHistory"
              render={props => (
                <VisitHistory {...props} getCurrentUser={this.getCurrentUser} />
              )}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
