import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
//import List from "collections/list"


var sideProfilePicStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  display: "inline",
  backgroundColor: "#70a7ff",
};

var listGroupStyle = {
  backgroundColor: "#70a7ff",
};

var searchStyle = {
  width: "100%",
  display: "flex",
};

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function UserNav() {
  var canSendRequest = true;
  var canConfirmRequest = false;
  var canDeleteRequest = false;
  var canIgnoreRequest = false;
  var canUnfriend = false;


  const requestState = [canSendRequest, canConfirmRequest, canDeleteRequest, canIgnoreRequest, canUnfriend]
  var incomingFriendRequests = []
  const [userData, setUserData] = useState([]);
  const [q, setQ] = useState("");
  const [sentRequest, updateSentRequest] = useState(false);

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
      var flag = user.incomingFriendRequests.includes(localStorage.getItem("email"))
        || user.friendList.includes(localStorage.getItem("email"))
      updateSentRequest(flag)
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


  useEffect(() => {
    const token = localStorage.getItem("token").toString();
    // i wrapped the api request into a function
    // const search = async () => {
    fetch(`https://localhost:5001/api/User/searchUsers/`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(q),
    })
      .then((response) => response.json())
      .then((json) => {
        setUserData(json);
      });
  }, [q]);

  return (
    <div className="min-w-25 min-vh-100 bg black float-start">
      <input
        style={searchStyle}
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ListGroup>
        {userData.map((user) => {
          // if statement checking if user has chosen to be searchable
          if (user.canSearch)
            return (
              <ListGroupItem style={listGroupStyle} key={user.id}>
                <Media hidden={user.email === localStorage.email} middle left>
                  <Media
                    className="m-1"
                    src={user.avatar ? user.avatar : defaultProfilePic}
                    style={sideProfilePicStyle}
                  />
                  <span>{user.email}</span>
                  <Button 
                    hidden = {((user.friendList.includes(localStorage.getItem("email")) || user.outgoingFriendRequests.includes(localStorage.getItem("email"))
                      || user.incomingFriendRequests.includes(localStorage.getItem("email"))))}
                    className = "btn-primary"
                    onClick = {() => sendRequest(user)}
                  >Send friend request</Button>
                  <Button 
                    hidden = {!user.friendList.includes(localStorage.getItem("email"))}
                    className = "btn-warning"
                    onClick = {()=> unfriend(user)}
                  >Unfriend</Button>
                  <Button 
                    hidden = {!user.incomingFriendRequests.includes(localStorage.getItem("email"))}
                    className = "btn-danger"
                    onClick = {() => deleteRequest(user)}
                  >Delete request</Button>
                  <Button 
                    hidden = {!user.outgoingFriendRequests.includes(localStorage.getItem("email"))}
                    className = "btn-success"
                    onClick = {()=> confirmRequest(user)}
                  >Confirm request</Button>
                  <Button 
                    hidden = {!user.outgoingFriendRequests.includes(localStorage.getItem("email"))}
                    className = "btn-secondary"
                    onClick = {()=> ignoreRequest(user)}
                  >Ignore</Button>

                </Media>
              </ListGroupItem>
            );
        })}
      </ListGroup>
    </div>
  );
}
