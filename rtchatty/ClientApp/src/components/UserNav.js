import React, { useState, useEffect } from "react";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
// import Row from "reactstrap/lib/Row";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvcGVAdGVzdC5jb20iLCJuYmYiOjE2MzMyMzk1OTEsImV4cCI6MTYzMzI0MzE5MSwiaWF0IjoxNjMzMjM5NTkxfQ.elJZK2BzyeliSXBvtA6DiarTQigkc9L5amr8mTMgdGg`;
const token = localStorage.getItem("token").toString();
// var displayUsers = [];
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

  useEffect(() => {
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
                <Media middle left>
                  <Media
                    className="m-1"
                    src={user.avatar ? user.avatar : defaultProfilePic}
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
