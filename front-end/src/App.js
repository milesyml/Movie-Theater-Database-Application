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
import ManageCompany from "./components/ManageCompany";
import CompanyDetail from "./components/CompanyDetail";
import TheaterOverview from "./components/TheaterOverview";
import ManagerOnlyFunctionality from "./components/ManagerOnlyFunctionality";
import CustomerFunctionality from "./components/CustomerFunctionality";
import ExploreMovie from "./components/ExploreMovie";
import ExploreTheater from "./components/ExploreTheater";
import ViewHistory from "./components/ViewHistory";
import VisitHistory from "./components/VisitHistory";

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
            <Route
              path="/managerOnlyFunctionality"
              component={ManagerOnlyFunctionality}
            ></Route>
            <Route
              path="/customerFunctionality"
              component={CustomerFunctionality}
            ></Route>
            <Route path="/manageUser" component={ManageUser} />
            <Route path="/manageCompany" component={ManageCompany} />
            <Route
              path="/companyDetail/:companyName"
              component={CompanyDetail}
            />
            <Route path="/theaterOverview" component={TheaterOverview} />
            <Route path="/exploreMovie" component={ExploreMovie} />
            <Route path="/exploreTheater" component={ExploreTheater} />
            <Route path="/viewHistory" component={ViewHistory} />
            <Route path="/visitHistory" component={VisitHistory} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
