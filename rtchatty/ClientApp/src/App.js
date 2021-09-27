import React, { Component } from 'react';
import { Route } from 'react-router';
//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Nav from './components/NavMenu';
// Export default means that you don't need to use braces around the class name
// Source: https://stackoverflow.com/questions/47619405/why-does-my-react-component-export-not-work
import Chat from './components/Chat';
import Login from "./components/Auth/Login";
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
   return (
      <Layout>
       <Route path='/login' component={Login} /> 
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/chat' component={Chat} />
        
      </Layout>
     );

    
  }
}
