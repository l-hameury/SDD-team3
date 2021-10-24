import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import axios from "axios";

const RequestButton = (props) =>{
    var incomingFriendRequests
    var user = props.user
  //Send request

  const sendRequest = (user) => {

    axios.post("https://localhost:5001/api/user/sendFriendRequest", {
      email: localStorage.getItem("email"),
      outgoingFriendRequests: [
         user.email
      ]
    })
    .then(function (res){
      incomingFriendRequests = user.incomingFriendRequests
      console.log(incomingFriendRequests)
      console.log(incomingFriendRequests.includes(localStorage.getItem("email")))
      console.log(res);
    })
    .catch(function (error){
      console.log(`An error occurred: ${error}`)
    })
    //console.log(user.email);
  };

  //confirm request

  const confirmRequest = (user) => {
    axios.post("https://localhost:5001/api/user/confirmFriendRequest", {
      email: localStorage.getItem("email"),
      incomingFriendRequests: [
         user.email
      ]
    })
    .then(function (res){
      console.log(res);
    })
    .catch(function (error){
      console.log(`An error occurred: ${error}`)
    })
  };

  //delete request

  const deleteRequest = (user) => {
    axios.post("https://localhost:5001/api/user/deleteFriendRequest", {
      email: localStorage.getItem("email"),
      incomingFriendRequests: [
         user.email
      ]
    })
    .then(function (res){
      console.log(res);
    })
    .catch(function (error){
      console.log(`An error occurred: ${error}`)
    })
  };

  //ignore request

  const ignoreRequest = (user) => {
    axios.post("https://localhost:5001/api/user/ignoreRequest", {
      email: localStorage.getItem("email"),
      incomingFriendRequests: [
         user.email
      ]
    })
    .then(function (res){
      console.log(res);
    })
    .catch(function (error){
      console.log(`An error occurred: ${error}`)
    })
  };

  //Unfriend

  const unfriend = (user) => {
    axios.post("https://localhost:5001/api/user/unfriend", {
      email: localStorage.getItem("email"),
      friendList: [
         user.email
      ]
    })
    .then(function (res){
      console.log(res);
    })
    .catch(function (error){
      console.log(`An error occurred: ${error}`)
    })
  };

    return (
        <><Button
            hidden={((user.friendList.includes(localStorage.getItem("email")) || user.outgoingFriendRequests.includes(localStorage.getItem("email"))
                || user.incomingFriendRequests.includes(localStorage.getItem("email"))))}
            className="btn-primary"
            onClick={() => sendRequest(user)}
        >Send friend request</Button><Button
            hidden={!user.friendList.includes(localStorage.getItem("email"))}
            className="btn-warning"
            onClick={() => unfriend(user)}
        >Unfriend</Button><Button
            hidden={!user.incomingFriendRequests.includes(localStorage.getItem("email"))}
            className="btn-danger"
            onClick={() => deleteRequest(user)}
        >Delete request</Button><Button
            hidden={!user.outgoingFriendRequests.includes(localStorage.getItem("email"))}
            className="btn-success"
            onClick={() => confirmRequest(user)}
        >Confirm request</Button><Button
            hidden={!user.outgoingFriendRequests.includes(localStorage.getItem("email"))}
            className="btn-secondary"
            onClick={() => ignoreRequest(user)}
        >Ignore</Button>
        </>

    );
}

export default RequestButton;