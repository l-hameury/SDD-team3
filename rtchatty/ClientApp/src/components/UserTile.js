import React, { useState, useEffect } from "react";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import RequestButton from "./RequestButton";
import Online from "./Online";

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

const UserTile = (props) => {
    var user = props.user

  return (
    <ListGroupItem  hidden={user.email === localStorage.email} style={listGroupStyle} key={user.id}>
    <Media middle left>
        <Media
        className="m-1"
        src={user.avatar ? user.avatar : defaultProfilePic}
        style={sideProfilePicStyle}
        />
        <span>{user.email}</span>
        <RequestButton user = {user}></RequestButton>

    </Media>
    <Online user={user}></Online>
    </ListGroupItem>
  );

}

export default UserTile