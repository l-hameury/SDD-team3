import React, { useState, useEffect } from "react";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Row from "reactstrap/lib/Row";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsIm5iZiI6MTYzMjg5MjQ4MywiZXhwIjoxNjMyODk2MDgzLCJpYXQiOjE2MzI4OTI0ODN9.NWflAKlq2bHTZPqShkbKvzsoCqFjXM_8wktw-aUWRoo`;
var displayUsers = [];
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

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function UserNav() {
  const [userData, setUserData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
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
        displayUsers = userData;
      });
  }, [q]);

  return (
    <div class="w-25 min-vh-100 bg-black float-start">
      <input
        width="100%"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      ></input>
      <ListGroup>
        {displayUsers.map((user) => {
          return (
            <ListGroupItem style={listGroupStyle}>
              <Media middle left>
                <Media
                  className="m-1"
                  src={defaultProfilePic}
                  style={sideProfilePicStyle}
                />
                <span>{user.email}</span>
              </Media>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
