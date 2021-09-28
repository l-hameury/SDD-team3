import axios from 'axios';
import React, {Component} from 'react'

export default class Login extends Component{

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.email,
            password: this.password
        }

        axios.post('https://localhost:5001/api/user/authenticate', data)
            .then(res =>{
                console.log(res)
                localStorage.setItem('token', res.token);
            })
            .catch(err =>{
                console.log(err)
            })

    }

    render(){
      return(
       <form onSubmit={this.handleSubmit}>
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