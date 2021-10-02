import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css";
//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import { Layout } from './components/Layout';
import { NavMenu } from "./components/NavMenu";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
// Export default means that you don't need to use braces around the class name
// Source: https://stackoverflow.com/questions/47619405/why-does-my-react-component-export-not-work
import Chat from "./components/Chat";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import "./custom.css";
import axios from "axios";
import RequireAuth from "./components/Auth/AuthenticationComponent";
import { Layout } from "./components/Layout";

export default class App extends Component {
  state = { auth: true };

  static displayName = App.name;

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.setState({ auth: false });
    }
  }

  render() {
    return (
      // <Provider store={store}>
      // <Layout>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Layout>
            <Route exact path="/" component={RequireAuth(Home)} />
            <Route
              exact
              path="/fetch-data"
              component={RequireAuth(FetchData)}
            />
            <Route exact path="/chat" component={RequireAuth(Counter)} />
            <Route exact path="/counter" component={RequireAuth(Chat)} />
            {!this.state.auth && <Redirect push to="/login" />}
          </Layout>
        </Switch>
      </BrowserRouter>
      //</Layout>

      // </Provider>
    );
  }
}
