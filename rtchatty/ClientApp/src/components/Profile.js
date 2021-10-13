import React, { useState, useEffect } from 'react'
import {
  Alert, Button, Card, CardBody,
  CardFooter, CardImg, CardText,
  Form, FormGroup, Label, Input,
  ListGroup, ListGroupItem, Modal,
  ModalBody, ModalHeader, ModalFooter,
  Container, Row, Col, Dropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    password: "",
    avatar: "",
    bio: "",
    username: ""
  })
  const [currentInfo, setCurrentInfo] = useState({ ...userInfo })
  const [editInfoModal, setEditInfoModal] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState("");

  // hook to initialize user information after rendering component
  useEffect(() => {
    // getting token and email to get user from the database
    const loggedInEmail = localStorage.getItem('email');
    axios.get("https://localhost:5001/api/user/getUserByEmail", {
      params: {
        email: loggedInEmail
      }
    })
      .then(function (res) {
        setUserInfo(res.data)
        setCurrentInfo(res.data)
      })
  }, [])

  // to update userInfo state on input change
  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    if (key === 'username') validateUsername(value)
    if (key === 'email') validateEmail(value);
    if (!usernameError || !emailError) setUserInfo({ ...userInfo, [key]: value })
  }

  // validation for username
  const validateUsername = (username) => {
    if (username.trim() === "") setUsernameError('Username is required');
    else if (username.length < 3) setUsernameError('Username must be at least 3 characters long');
    else setUsernameError('');
  }

  // validation for email
  const validateEmail = (email) => {
    if (email.length === 0) setEmailError('Email is required');
    else if (!email.match("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$")) setEmailError('Invalid Email Format')
    else setEmailError('');
  }

  // api request to update user information once submit button is pressed, if an error exists it will do nothing
  const updateInfo = () => {
    if (usernameError || emailError) return;

    axios.post("https://localhost:5001/api/user/profileUpdate", {
      id: userInfo.id,
      email: userInfo.email,
      username: userInfo.username,
      avatar: userInfo.avatar,
      bio: userInfo.bio
    })
      .then(function () {
        setEditInfoModal(!editInfoModal);
        setCurrentInfo({ ...userInfo })
        setSuccess("Profile successfully updated")
      })
      .catch(function (error) {
        if (error.response.data.includes("Username")) setUsernameError("Username is already taken.")
        if (error.response.data.includes("Email")) setEmailError("Email is already taken.")
      })
  }

  // to show the update modal for users to edit their information
  const toggleEditInfoModal = () => setEditInfoModal(!editInfoModal);
  const toggleSettingsDropdown = () => setSettingsDropdown(!settingsDropdown);

  // this resets information upon pressing the X button or the Close button in the Modal
  const resetInfo = () => {
    setUserInfo({ ...currentInfo })
    setUsernameError("");
    setEmailError("");
    setSuccess("");
    setEditInfoModal(!editInfoModal)
  }

  return (
    <div>
      <Container fluid="sm">
        <Card>
          <Row>
            <Col xs="3">
              <CardImg
                className="rounded-circle"
                style={{ padding: "5px" }}
                onError={event => { event.target.src = defaultProfilePic; }}
                src={currentInfo.avatar ? currentInfo.avatar : defaultProfilePic}>
              </CardImg>
            </Col>
            <Col xs="9">
              <Row>
                <CardBody>
                  <ListGroup>
                    <ListGroupItem style={{ display: "inherit" }}>
                      <Col xs="2"> Username: </Col>
                      <Col style={{ textAlign: "right" }} className="profileInfo">
                        <strong> <CardText id="userName" name="userName">{currentInfo.username}</CardText> </strong>
                      </Col>
                    </ListGroupItem>
                    <ListGroupItem style={{ display: "inherit" }}>
                      <Col xs="2"> Email: </Col>
                      <Col style={{ textAlign: "right" }}>
                        <strong> <CardText id="email" name="email">{currentInfo.email}</CardText> </strong>
                      </Col>
                    </ListGroupItem>
                    <ListGroupItem style={{ display: "inherit" }}>
                      <Col xs="2"> Status: </Col>
                      <Col style={{ textAlign: "right" }}>
                        <strong> <CardText id="email" name="email">{"online"}</CardText> </strong>
                      </Col>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Row>
              <Row>
                <CardBody>
                  <CardText name='bio'>{currentInfo.bio ? currentInfo.bio : "Hello"}</CardText>
                </CardBody>
              </Row>
            </Col>
          </Row>
          <CardFooter style={{ textAlign: "right" }}>
            <Dropdown isOpen={settingsDropdown} toggle={toggleSettingsDropdown} size="sm">
              <DropdownToggle color="secondary">Settings</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={toggleEditInfoModal}>Edit Profile</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardFooter>
        </Card>
        <Alert className="rounded" color="success" hidden={!success}>{success}</Alert>
      </Container>

      <Modal isOpen={editInfoModal} toggle={resetInfo} className="updateModal">
        <ModalHeader toggle={resetInfo}>Update your information</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username"> Username:
                <Input name={"username"} id="username" defaultValue={currentInfo.username} onChange={handleChange}></Input>
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="email"> Email:
                <Input type="email" name={"email"} id="email" defaultValue={currentInfo.email} onChange={handleChange}></Input>
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="bio"> Bio:
                <Input style={{ width: "150%", height: "10rem" }} type="textarea" name={"bio"} id="bio" defaultValue={currentInfo.bio} onChange={handleChange}></Input>
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="avatar"> Avatar Link:
                <Input style={{ width: "150%" }} name={"avatar"} id="avatar" defaultValue={currentInfo.avatar} onChange={handleChange}></Input>
              </Label>
            </FormGroup>
          </Form>
          <Alert color="danger" hidden={!usernameError}>{usernameError}</Alert>
          <Alert color="danger" hidden={!emailError}>{emailError}</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={updateInfo}>Submit</Button>
          <Button color="danger" onClick={resetInfo}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Profile