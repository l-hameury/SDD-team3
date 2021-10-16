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
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Media from "reactstrap/lib/Media";
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
  //   height: "fit-content",
  //   minWidth: "40%",
};

// var profileTitle = {
// //   width: "fit-content",
// //   height: "fit-content",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
// };

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
  //   const [selectedUser, setSelectedUser] = userState({});

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

  const banUser = async (user) => {
    user.banned = true;
    axios
      .post("https://localhost:5001/api/user/banUser", {
        email: user.email,
      })
      .then(function (res) {
        // setEditInfoModal(!editInfoModal);
        // setCurrentInfo({ ...userInfo });
        setBanSuccess(`${user.email} successfully banned`);
        // localStorage.setItem("email", res.data.email);
      })
      .catch(function (error) {
        //     if (error.response.data.includes("Username"))
        //       setUsernameError("Username is already taken.");
        //     if (error.response.data.includes("Email"))
        //       setEmailError("Email is already taken.");
      });
  };

  return (
    <div>
      <div
        className="alert alert-success"
        hidden={!showBanSuccess}
        name="successAlert"
      >
        Success! An account has been created. Return to{" "}
        <a href="/login" className="alert-link">
          login
        </a>{" "}
        to sign-in.
      </div>

      {/* className="min-w-100 min-vh-100"> */}
      <input
        style={searchStyle}
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="d-flex flex-wrap">
        {userData.map((user) => {
          return (
            // <Col className="m-3">
            <Card key={user.id} className="m-3" style={profileTitle}>
              <CardBody>
                <CardTitle>
                  <CardImg
                    className="float-start m-2"
                    variant="start"
                    src={user.avatar ? user.avatar : defaultProfilePic}
                    style={sideProfilePicStyle}
                  />
                  {/* <Container className="m-2"> */}
                  {user.username} <br />
                  <small>{user.email}</small>
                  {/* </Container> */}
                </CardTitle>
                <CardText>This is a placeholder, {user.bio}</CardText>
              </CardBody>
              <CardFooter>
                <Button
                  disabled={user.banned}
                  className="btn-warning"
                  onClick={() => banUser(user)}
                >
                  Ban
                </Button>
                <Button className="btn-danger">Delete</Button>
              </CardFooter>
            </Card>
            // </Col>

            // <ListGroupItem
            //   className="m-3 w-25"
            //   style={listGroupStyle}
            //   key={user.id}
            // >
            //   <Media middle left>
            //     <Media
            //       className="m-1"
            //       src={user.avatar ? user.avatar : defaultProfilePic}
            //       style={sideProfilePicStyle}
            //     />
            //     <span>{user.email}</span>
            //   </Media>
            // </ListGroupItem>
          );
        })}
      </div>
    </div>
  );
}
