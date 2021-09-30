import React, { Component } from 'react';
import { BrowserRouter,Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import { Layout } from './components/Layout';
import NavMenu from './components/NavMenu';
import Home from './components/Home';
import Nav from './components/Nav';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
// Export default means that you don't need to use braces around the class name
// Source: https://stackoverflow.com/questions/47619405/why-does-my-react-component-export-not-work
import Chat from './components/Chat';
import Login from "./components/Login";
import SignUp from "./components/Signup";
import './custom.css'
import axios from 'axios';

/* export default class App extends Component {
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
} */


/* function App(){

  
  
  return(
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>

            </Switch>
          </div>
      </div>
    </div>
    </BrowserRouter>
  );
  
}

export default App; */


export default class App extends Component{
  state = {}
  componentDidMount = () =>{
    axios.get('https://localhost:5001/api/user').then(
      res=>{
        console.log(res);
        this.setUser(res.data)
      },
      err => {
        console.log(err)
      }
    )
  };

  setUser = users =>{
    this.setState({
      users: users
    });
  }
  
  render(){
  return(
    <BrowserRouter>
    <div className="App">
      <Nav users ={this.state.users} setUser={this.setUser}/>
      <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={() =><Home users= {this.state.users}/>}/>
              <Route exact path="/login" component={() => <Login setUser={this.setUser}/>}/>
              <Route exact path="/signup" component={SignUp}/>

            </Switch>
          </div>
      </div>
    </div>
    </BrowserRouter>
  );
  }
}

