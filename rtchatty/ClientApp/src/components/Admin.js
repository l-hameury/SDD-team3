import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  CardTitle,
  CardBody,
  CardImg,
  CardText,
  Container,
  CardFooter,
  Button,
} from "reactstrap";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";

var sideProfilePicStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  display: "flex",
  backgroundColor: "#70a7ff",
};

var profileTitle = {
  width: "40%",
};

var listGroupStyle = {
  backgroundColor: "#70a7ff",
};

var searchStyle = {
  width: "100%",
  display: "flex",
};

export default function AdminPage() {
  const [userData, setUserData] = useState([]);
  const [q, setQ] = useState("");
  const [showBanSuccess, setBanSuccess] = useState(false);
  const [banMessage, setBanMessage] = useState("");
  const [error, setError] = useState("");
  const [canAccess, setAccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token").toString();
    isAdmin();
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

  const banUser = async (user) => {
    axios
      .post("https://localhost:5001/api/user/banUser", {
        UserEmail: user.email,
      })
      .then(function (res) {
        setBanSuccess(true);
        user.banned = !user.banned;
        setBanMessage(
          user.banned
            ? `${user.email} successfully banned`
            : `${user.email} successfully unbanned`
        );
      })
      .catch(function (error) {
        setError(`Error banning ${user.email}`);
      });
  };

  const deleteUser = async (user) => {
    axios
      .post("https://localhost:5001/api/user/deleteUser", {
        UserEmail: user.email,
      })
      .then(function (res) {
        userData.splice(userData.indexOf(user), 1);
        setBanSuccess(true);
        setBanMessage(`Successfully deleted ${user.email}`);
      })
      .catch(function (error) {
        setError(`Error deleting ${user.email}`);
      });
  };

  const isAdmin = async () => {
    const email = localStorage.getItem("email").toString();
    axios
      .post("https://localhost:5001/api/user/isAdmin", {})
      .then(function (res) {
        setAccess(res.data);
      })
      .catch(function (error) {
        setError(`Error Checking Admin Status for User ${email}`);
      });
  };

  if (canAccess) {
    return (
      <div>
        <div
          className="alert alert-success"
          hidden={!showBanSuccess}
          name="successAlert"
        >
          Success! {banMessage}
        </div>

        <div className="alert alert-danger" hidden={!error} name="Error">
          {error}
        </div>

        <input
          style={searchStyle}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="d-flex flex-wrap">
          {userData.map((user) => {
            return (
              <Card key={user.id} className="m-3" style={profileTitle}>
                <CardBody>
                  <CardTitle>
                    <CardImg
                      className="float-start m-2"
                      variant="start"
                      src={user.avatar ? user.avatar : defaultProfilePic}
                      style={sideProfilePicStyle}
                    />
                    {user.username} <br />
                    <small>{user.email}</small>
                  </CardTitle>
                  <CardText>This is a placeholder, {user.bio}</CardText>
                </CardBody>
                <CardFooter>
                  <Button
                    hidden={user.banned}
                    className="btn-warning"
                    onClick={() => banUser(user)}
                  >
                    Ban
                  </Button>
                  <Button
                    hidden={!user.banned}
                    className="btn-warning"
                    onClick={() => banUser(user)}
                  >
                    Unban
                  </Button>
                  <Button
                    className="btn-danger"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unauthorized, Admins Only</h1>
        <h3>Please request admin status from another admin</h3>
      </div>
    );
  }
}
