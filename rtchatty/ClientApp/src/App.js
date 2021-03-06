import React, { Component, useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { light, dark } from "./components/Themes"
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Style";
// Export default means that you don't need to use braces around the class name
// Source: https://stackoverflow.com/questions/47619405/why-does-my-react-component-export-not-work
import Chat from "./components/Chat";
import Register from "./components/Register";
import Profile from "./components/Profile/Profile";
import UserNav from "./components/UserNav";
import Login from "./components/Login";
import useToken from "./components/Auth/useToken";
import { Route, Switch, useLocation } from "react-router-dom";
import "./custom.css";
import axios from "axios";
import AdminPage from "./components/Admin";
import LogOut from "./components/LogOut";
import ChannelSearch from "./components/ChannelSearch";
import ChannelManage from "./components/ChannelManage";

// refactoring App.js
function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  //assign the results to a token variable
  const { token, setToken } = useToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // if token doesn't exist, redirect back to login page,
  // sending token to prop in Login

  // Return register page if the pathname matches and there is no token
  if (useLocation().pathname === "/register" && !token) {
    // This is missing the Layout component, so it will not have the Nav bar.
    return <Route exact path="/register" component={Register} />
  }
  // Else return login page if no token.
  else if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <>
        <GlobalStyles />
        <Layout>
          <button onClick={themeToggler}>Switch Theme</button>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/counter" component={Counter} />
            <Route exact path="/fetch-data" component={FetchData} />
            <Route exact path="/chat/:channel?" component={Chat} />
            <Route exact path="/channel/search" component={ChannelSearch} />
            <Route exact path="/channel/manage" component={ChannelManage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/user-nav" component={UserNav} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/logout" component={LogOut} />
          </Switch>
        </Layout>
      </>
    </ThemeProvider>
  );
}

export default App;
//
