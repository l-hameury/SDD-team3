import axios from 'axios';
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Login extends Component{

    state = {}
    handleSubmit = e => {
        e.preventDefault();
        //stores users data from form
        const data = {
            email: this.email,
            password: this.password
        }
        // calls api to authenticate user
        axios.post('https://localhost:5001/api/user/authenticate', data)
            .then(res =>{
                // console.log(res) //console logs user info and token
                localStorage.setItem('token', res.data.token); //stores token in local storage
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(res.data.user)
            })
            .catch(err =>{
                //console.log(err)
                this.setState({
                    message: err.response.data.message // error message
                })
            })
    };


    render(){
        if(this.state.loggedIn){ //if loggIn is true
            return <Redirect exact from ="/login" to={'/'}/>; //redirect to home page with authorized message
        }

      let  error = ''

      if (this.state.message){// if there is an error, message will be triggered
        error = (
            <div className="alert alert-danger" role="alert">
                {this.state.message}
            </div>
        )
      }
      return(
          // {error} error message to be displayed
       <form onSubmit={this.handleSubmit}>
            {error}
           <h3>Login</h3> 
           <div className="form-group">
               <label>Email</label>
               <input type="email" className="form-control" placeholder="Email"
                    onChange={e=>this.email = e.target.value}/>
           </div>

           <div className="form-group">
               <label>Password</label>
               <input type="password" className="form-control" placeholder="Password"
                    onChange={e=>this.password = e.target.value}/>
           </div>

           <button className="btn btn-primary btn-block">Sign In</button>

       </form>
      );
    }
}