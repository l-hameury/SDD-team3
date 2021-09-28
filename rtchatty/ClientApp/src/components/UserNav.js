import React, { useState, useEffect } from "react";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Row from "reactstrap/lib/Row";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvcGVAdGVzdC5jb20iLCJuYmYiOjE2MzI4MTY0MzMsImV4cCI6MTYzMjgyMDAzMywiaWF0IjoxNjMyODE2NDMzfQ.2Ko4EO_m6fUcRjIlwYqg6k7AwKjNnRFzHLGwxJa09Ds`;

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
    fetch("https://localhost:5001/api/User/getUsers", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setUserData(json);
        // users = userData;
      });
  }, []);

  function search(users) {
    return users.filter((user) => user.email.toLowerCase().indexOf(q) > -1);
  }

  return (
    <div class="w-25 min-vh-100 bg-black float-start">
      <Row>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        ></input>
      </Row>
      <ListGroup>
        {userData.map((user) => {
          return (
            <ListGroupItem style={listGroupStyle}>
              <Media middle left>
                <Media
                  className="m-1"
                  src={defaultProfilePic}
                  style={sideProfilePicStyle}
                />
                <span>{user.email} Success</span>
              </Media>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
