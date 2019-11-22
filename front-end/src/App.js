import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
