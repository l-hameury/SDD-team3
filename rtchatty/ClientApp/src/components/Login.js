import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser(credentials){
    // Hold returnData for... returning. :)
    let returnData;

    await axios.post('https://localhost:5001/api/user/authenticate', {
      email: credentials.email,
      password: credentials.password
    })
    .then(function (res) {
      returnData = res.data;
    })
    // TODO: Implement error handling
    .catch(function (error) {
      console.log(error);
      return error;
    })

    return returnData;
}

// app.js passes prop to login
export default function Login({setToken}){
    //setting up local state to grab email and password
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // TODO: Actually use this error for error handling
    const [error, setError] = useState();

    // event listener for login button
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const authData = await loginUser({
            email,
            password
        });
        // localStorage.setItem("token", authData.token);
        localStorage.setItem("email", email);
        setToken(authData.token);
    }
    //basic login form 
    return (
        <div>
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Email</p>
                <input type="text" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
        </div>
    )
}

Login.propTypes = {
    //ensure the prop being passed is function type?
    setToken: PropTypes.func.isRequired
}

