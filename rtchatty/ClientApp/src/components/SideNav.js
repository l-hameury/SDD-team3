import React, { Component, useState, useEffect } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import Container from "reactstrap/lib/Container";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import axios from "axios";

var sideProfilePicStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  display: "inline",
  backgroundColor: "#70a7ff",
};

// var sideNavStyle = {
//   //   width: "25%",
//   //   height: "100%",
//   //   top: "0",
//   //   left: "0",
//   backgroundColor: "#70a7ff",
//   transition: ".5s ease",
//   display: "flex",
//   flexDirection: "column",
//   float: "left",
// };

var listGroupStyle = {
  backgroundColor: "#70a7ff",
};

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsIm5iZiI6MTYzMjgxMTY5NCwiZXhwIjoxNjMyODE1Mjk0LCJpYXQiOjE2MzI4MTE2OTR9.DN9OchwCXz-XFbekktFnO6bFpVZaLumEpzJR6PcqagQ`;

export class SideNav extends Component {
  // static displayName = SideNav.name;
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://localhost:5001/api/User/getUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.items.toList(),
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      );
  }

  // async getUsers() {
  //   // post request to update user info
  //   // i hardcoded some information to test but it works lol
  //   // just need this component to have user information (from props im assuming)
  //   // so that we can pass that information into the api request
  //   await axios
  //     .get("https://localhost:5001/api/user/getUsers", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(function (res) {
  //       console.log(res);
  //       users = res.data;
  //       loading = false;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       errors = true;
  //       loading = false;
  //     });
  //   console.log("Edited Value -> ");
  // }

  render() {
    const { errors, isLoaded, users } = this.state;
    if (errors) {
      return (
        <div class="min-vh-100 float-start bg-black">
          <ListGroup style={listGroupStyle}>
            <ListGroupItem style={listGroupStyle}>
              {errors.map((error) => (
                <span> {error} </span>
              ))}
            </ListGroupItem>
          </ListGroup>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div class="min-vh-100 float-start bg-black">
          <ListGroup style={listGroupStyle}>
            <ListGroupItem style={listGroupStyle}>Loading...</ListGroupItem>
          </ListGroup>
        </div>
      );
    } else {
      return (
        // <Container className="h-100 w-25" style={sideNavStyle}>
        <div class="min-vh-100 float-start bg-black">
          {/* <Container className="float-left w-25 h-100 bg-darken-3"> */}
          <ListGroup style={listGroupStyle}>
            <ListGroupItem style={listGroupStyle}>
              <Media middle left>
                <Media
                  className="m-1"
                  src={defaultProfilePic}
                  style={sideProfilePicStyle}
                />
                <span>{users.length} Success</span>
              </Media>
            </ListGroupItem>
            <ListGroupItem style={listGroupStyle}>
              <Media middle left>
                <Media
                  className="m-1"
                  src={defaultProfilePic}
                  style={sideProfilePicStyle}
                />
                Hello World
              </Media>
            </ListGroupItem>
          </ListGroup>
          {/* </Container> */}
        </div>
      );
    }
  }
}
