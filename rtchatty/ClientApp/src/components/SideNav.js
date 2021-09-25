import React, { Component } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import Container from "reactstrap/lib/Container";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import Media from "reactstrap/lib/Media";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";

// var users = [];

var sideProfilePicStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  display: "inline",
  backgroundColor: "#70a7ff",
};

var sideNavStyle = {
  //   width: "25%",
  //   height: "100%",
  //   top: "0",
  //   left: "0",
  backgroundColor: "#70a7ff",
  transition: ".5s ease",
  display: "flex",
  flexDirection: "column",
  float: "left",
};

var listGroupStyle = {
  backgroundColor: "#70a7ff",
};

export class SideNav extends Component {
  static displayName = SideNav.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
    this.getFriends();
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Container className="h-100 w-25" style={sideNavStyle}>
        {/* <Container className="float-left w-25 h-100 bg-darken-3"> */}
        <ListGroup style={listGroupStyle}>
          <ListGroupItem style={listGroupStyle}>
            <Media middle left>
              <Media
                className="m-1"
                src={defaultProfilePic}
                style={sideProfilePicStyle}
              />
              <span>Hello World</span>
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
      </Container>
    );
  }
  async getFriends() {
    try {
      const response = await fetch("api/user/getusers");
      const data = await response.json();
      this.setState({ users: data, loading: false });
    } catch (e) {
      console.log("Get Users Failed", e);
    }
    // const response = await fetch("weatherforecast");
    // const data = await response.json();
    // this.setState({ forecasts: data, loading: false });
  }
}
