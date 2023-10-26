import React, { Component } from "react";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Root from "./Root";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8888";


class App extends Component {
  render() {
    return (
      <div>
       <Root>
          <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
      </Root>

      </div>
    );
  }
}

export default App;