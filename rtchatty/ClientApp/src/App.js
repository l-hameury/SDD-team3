import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
// Export default means that you don't need to use braces around the class name
// Source: https://stackoverflow.com/questions/47619405/why-does-my-react-component-export-not-work
import Chat from './components/Chat';
import Register from './components/Register';
import Profile from './components/Profile';
import UserNav from "./components/UserNav";
import Login from "./components/Login";
import useToken from "./components/Auth/useToken";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './custom.css'

// refactoring App.js
function App() {

  //assign the results to a token variable
  const {token, setToken} = useToken();

  // if token doesn't exist, redirect back to login page, 
  // sending token to prop in Login
  // TODO: Remove Debug
  // console.log(token); // debugging
  if(!token){
    // console.log("inside token if statment") //debugging
    return <Login setToken={setToken}/>
  }
   
return( 
      <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/counter" component={Counter}/>
            <Route exact path="/fetch-data" component={FetchData}/>
            <Route exact path="/chat" component={Chat}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/user-nav" component={UserNav}/>
          </Switch>
      </Layout>
    );
}

export default App;
//