import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [authToke, setToken] = useState("");
  var userEmail;
  var userPass;

  const handleSubmit = (e) => {
    e.preventDefault();
    //stores users data from form
    const user = {
      email: userEmail,
      password: userPass,
    };

    fetch(`https://localhost:5001/api/user/authenticate`, {
      method: "POST",
      headers: new Headers({
        // Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
        setMessage(err);
        // this.setState({
        //   message: err.response.data.message, // error message
        // });
      })
      .then((json) => {
        var result = json.token;
        setToken(result);
        localStorage.setItem("token", result);
      });
  };

  //   return() {
  if (authToke) {
    const search = location.search;
    const params = new URLSearchParams(search);
    const destination = params.get("redirect");
    return <Redirect to={destination ? destination : "/"} />; //redirect to page attempted to reach before login
    // return <Redirect to="/" />; //redirect to homepage
  }

  let error = "";

  if (message) {
    // if there is an error, message will be triggered
    error = (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  }
  return (
    // {error} error message to be displayed
    <form onSubmit={handleSubmit}>
      {error}
      <h3>Login</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          onChange={(e) => (userEmail = e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => (userPass = e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-block">Sign In</button>
    </form>
  );
  //   }
}
