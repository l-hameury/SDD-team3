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
  const [showSuccess, setSuccess] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
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
    const email = localStorage.getItem("email").toString();
    axios
      .post("https://localhost:5001/api/admin/banUser", {
        UserEmail: user.email,
      })
      .then(function (res) {
        setSuccess(true);
        user.banned = !user.banned;
        setActionMessage(
          user.banned
            ? `${user.email} successfully banned`
            : `${user.email} successfully unbanned`
        );
      })
      .catch(function (error) {
        setError(`Error banning ${user.email}`);
      });
  };

  const setAdminStatus = async (user) => {
    axios
      .post("https://localhost:5001/api/admin/setAdminStatus", {
        UserEmail: user.email,
      })
      .then(function (res) {
        setSuccess(true);
        user.isAdmin = !user.isAdmin;
        setActionMessage(
          user.isAdmin
            ? `${user.email} is now an admin`
            : `${user.email} is no longer an admin`
        );
      })
      .catch(function (error) {
        setError(`Error setting admin status for ${user.email}`);
      });
  };

  const deleteUser = async (user) => {
    const email = localStorage.getItem("email").toString();
    axios
      .post("https://localhost:5001/api/admin/deleteUser", {
        UserEmail: user.email,
      })
      .then(function (res) {
        userData.splice(userData.indexOf(user), 1);
        setSuccess(true);
        setActionMessage(`Successfully deleted ${user.email}`);
      })
      .catch(function (error) {
        setError(`Error deleting ${user.email}`);
      });
  };

  const isAdmin = async () => {
    axios
      .get("https://localhost:5001/api/admin/isAdmin", {})
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
          hidden={!showSuccess}
          name="successAlert"
        >
          Success! {actionMessage}
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
                  <Button className="btn-warning" onClick={() => banUser(user)}>
                    {user.banned ? "Unban" : "Ban"}
                  </Button>
                  <Button
                    className="btn-primary"
                    onClick={() => setAdminStatus(user)}
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
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
