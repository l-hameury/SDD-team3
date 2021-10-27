import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import axios from "axios";

const RequestButton = (props) =>{

    var incomingFriendRequests
    var user = props.user
    var suggestFlag = ((user.friendList.includes(localStorage.getItem("email")) || user.outgoingFriendRequests.includes(localStorage.getItem("email"))
    || user.incomingFriendRequests.includes(localStorage.getItem("email"))))
    var unfriendFlag = !user.friendList.includes(localStorage.getItem("email"))
    var confirmFlag = !user.outgoingFriendRequests.includes(localStorage.getItem("email"))
    var deleteFlag = !user.incomingFriendRequests.includes(localStorage.getItem("email"))
    var ignoreFLag = !user.outgoingFriendRequests.includes(localStorage.getItem("email"))

    const [suggestState, setSuggestState] = useState(suggestFlag)
    const [unfriendState, setUnfriendState] = useState(unfriendFlag)
    const [confirmState, setConfirmState] = useState(confirmFlag)
    const [deleteState, setDeleteState] = useState(deleteFlag)
    const [ignoreState, setIgnoreState] = useState(ignoreFLag)
  //Send request

  const sendRequest = (user) => {

    axios.post("https://localhost:5001/api/user/sendFriendRequest", {
      email: localStorage.getItem("email"),
      outgoingFriendRequests: [
         user.email
      ]
    })
    .then(function (res){
      setSuggestState(!suggestState);
      setDeleteState(!deleteState)
      incomingFriendRequests = user.incomingFriendRequests
    })
    .catch(function (error){
      console.log(`An error occurred: ${error}`)
    })
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
      setConfirmState(!confirmState)
      setUnfriendState(!unfriendState)
      setIgnoreState(!ignoreState)
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
      setSuggestState(!suggestState);
      setDeleteState(!deleteState)
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
      setIgnoreState(!ignoreState)
      setSuggestState(!suggestState)
      setConfirmState(!confirmState)
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
      setUnfriendState(!unfriendState)
      setSuggestState(!suggestState)
    })
    .catch(function (error){
      console.log(`An error occurred: ${error}`)
    })
  };

    return (
        <><Button
            hidden={suggestState}
            className="btn-primary"
            onClick={() => sendRequest(user)}
        >Send friend request</Button><Button
            hidden={unfriendState}
            className="btn-warning"
            onClick={() => unfriend(user)}
        >Unfriend</Button><Button
            hidden={deleteState}
            className="btn-danger"
            onClick={() => deleteRequest(user)}
        >Delete request</Button><Button
            hidden={confirmState}
            className="btn-success"
            onClick={() => confirmRequest(user)}
        >Confirm request</Button><Button
            hidden={ignoreState}
            className="btn-secondary"
            onClick={() => ignoreRequest(user)}
        >Ignore</Button>
        </>

    );
}

export default RequestButton;