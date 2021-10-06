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
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './custom.css'

// refactoring App.js
function App() {

  //assign the results to a token variable
  const {token, setToken} = useToken();

  // if token doesn't exist, redirect back to login page, 
  // sending token to prop in Login
  if(!token){
    return <Login setToken={setToken}/>
  }

    return( 
      <Layout>
        {/* <BrowserRouter> */}
          <Switch>
            <Route path="/"><Home/></Route>
            <Route path="/counter"><Counter/></Route>
            <Route path="/fetch-data"><FetchData/></Route>
            <Route path="/chat"><Chat/></Route>
            <Route path="/register"><Register/></Route>
            <Route path="/profile"><Profile/></Route>
            <Route path="/user-nav"><UserNav/></Route>
          </Switch>
        {/* </BrowserRouter> */}
      </Layout>
    );
}

export default App;
