import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";


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
  const [userData, setUserData] = useState([]);
  const [q, setQ] = useState("");

  //Send request

  const sendRequest = (user) => {

    axios.post("https://localhost:5001/api/user/sendFriendRequest", {
      email: localStorage.getItem("email"),
      outgoingFriendRequests: [
         user.email
      ]
    })
    .then(function (res){
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
                    hidden = {false}
                    className = "btn-primary"
                    onClick = {() => sendRequest(user)}
                  >Send friend request</Button>
                  <Button 
                    hidden = {false}
                    className = "btn-secondary"
                    onClick = {()=> unfriend(user)}
                  >Unfriend</Button>
                  <Button 
                    hidden = {false}
                    className = "btn-danger"
                    onClick = {() => deleteRequest(user)}
                  >Delete request</Button>
                  <Button 
                    hidden = {false}
                    className = "btn-success"
                    onClick = {()=> confirmRequest(user)}
                  >Confirm request</Button>

                </Media>
              </ListGroupItem>
            );
        })}
      </ListGroup>
    </div>
  );
}
