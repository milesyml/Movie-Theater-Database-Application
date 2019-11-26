import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import AdminOnlyFunctionality from "./components/AdminOnlyFunctionality";
import ManageUser from "./components/ManageUser";

class App extends Component {
  goToHome = childProps => {
    childProps.history.push("/");
  };

  goToManageUser = childProps => {
    childProps.history.push("/ManageUser");
  };

  goToManageCompany = childProps => {
    childProps.history.push("/ManageCompany");
  };

  goToCreateMovie = childProps => {
    childProps.history.push("/CreateMovie");
  };

  goToExploreTheater = childProps => {
    childProps.history.push("/ExploreTheater");
  };

  goToVisithistory = childProps => {
    childProps.history.push("/VisitHistory");
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route
              path="/adminonlyfunctionality"
              render={props => (
                <AdminOnlyFunctionality
                  {...props}
                  goToManageUser={this.goToManageUser}
                  goToManageCompany={this.goToManageCompany}
                  goToCreateMovie={this.goToCreateMovie}
                  goToExploreTheater={this.goToExploreTheater}
                  goToVisithistory={this.goToVisithistory}
                  goToHome={this.goToHome}
                />
              )}
            />
            <Route path="/ManageUser" component={ManageUser} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
