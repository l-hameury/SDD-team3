import React, { useState, useEffect } from "react";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
// import Row from "reactstrap/lib/Row";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwibmJmIjoxNjMzMTMxMjQwLCJleHAiOjE2MzMxMzQ4NDAsImlhdCI6MTYzMzEzMTI0MH0.y3_H7MqCQYL6doETFKdCUt4ICqIO9j5DvSlG1m3aoMY`;
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

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function UserNav() {
  const [userData, setUserData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    // i wrapped the api request into a function
    const search = async () => {
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
        // displayUsers = userData;
      });
    }

    const timeoutId = setTimeout(() => {
    if(q){
      search()
    }
      // 1 second delay?
    }, 1000);
    // api throttling
    return () => {
      clearTimeout(timeoutId)
    };
  }, [q]);

  return (
    <div className="w-25 min-vh-100 bg black float-start">
      <input
        width="100%"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      ></input>
      <ListGroup>
        {userData.map((user) => {
          return (
            <ListGroupItem style={listGroupStyle} key={user.id}>
              <Media middle left>
                <Media
                  className="m-1"
                  src={user.avatar}
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
