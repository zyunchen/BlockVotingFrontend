import React, { Component } from "react";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import InvoiceCreate from "./pages/invoice_create/InvoiceCreate";
import InvoiceList from "./pages/invoice_list/InvoiceList";
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
            <Route path="/invoice_create" component={InvoiceCreate} />
            <Route path="/invoice_list" component={InvoiceList} />

          </Switch>
      </Root>

      </div>
    );
  }
}

export default App;