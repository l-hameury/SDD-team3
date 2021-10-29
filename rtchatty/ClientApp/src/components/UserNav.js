import axios from "axios";
import React, { useState, useEffect } from "react";
import ListGroup from "reactstrap/lib/ListGroup";
import UserTile from "./UserTile";

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
                  console.log(user.isOnline)
            return (
              <UserTile user={user} key = {user.id}></UserTile>
            );
        })}
      </ListGroup>
    </div>
  );
}
