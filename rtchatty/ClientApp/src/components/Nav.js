import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* export default class NavMenu extends Component{
    render(){
      return(
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link href="" className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>);
  
    }
  } */


  export default class NavMenu extends Component{
    render(){
        let buttons;

        if(this.props.users){ // if there list of users, will need to redo for logged in user
            buttons=(
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" onClick={() => localStorage.clear()} className="nav-link" >Logout</Link>
            </li>
          </ul>)

        }else{
            //if user is logged out
           buttons=(<ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
          </ul>)
        }
      return(
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link href="" className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse">
            {buttons}
        </div>
      </div>
    </nav>);
  
    }
  }