import React, { useState, useEffect } from 'react'
import {
  Alert, Button, Card, CardBody,
  CardFooter, CardImg, CardText,
  Form, FormGroup, Label, Input,
  ListGroup, ListGroupItem, Modal,
  ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import '../profile.css'

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    password: "",
    avatar: "",
    bio: "",
    username: ""
  })
  const [currentInfo, setCurrentInfo] = useState({...userInfo})
  const [editInfoModal, setEditInfoModal] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState("");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvZ2d1eUB0ZXN0LmNvbSIsIm5iZiI6MTYzMzcyODY1MywiZXhwIjoxNjMzNzMyMjUzLCJpYXQiOjE2MzM3Mjg2NTN9.YiSyOKnfxVQT4kKgAKc8FU7ZxuaHFPOyn29TS-v0GKU"
  // const token = localStorage.getItem('token');

  // im using this hook to initialize user information after rendering component
  useEffect(() => {
    axios.get("https://localhost:5001/api/user/getUserByEmail", {
      params: {
        email: 'dogguy@test.com'
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(function (res){
      setUserInfo(res.data)
      setCurrentInfo(res.data)
    })
    .catch(function (error){
      console.log(error)
    })
  }, [])

  // to update userInfo state on input change
  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    if(key === 'username') validateUsername(value)
    if(key === 'email') validateEmail(value);
    if(!usernameError || !emailError) setUserInfo({ ...userInfo, [key]: value})
  }

  // validation for username
  const validateUsername = (username) => {
    if(username.trim() === "") setUsernameError('Username is required');
    else if(username.length < 3) setUsernameError('Username must be at least 3 characters long');
    else setUsernameError('');
  }
  
  // validation for email
  const validateEmail = (email) => {
    if(email.length === 0) setEmailError('Email is required');
    else if(!email.match("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$")) setEmailError('Invalid Email Format')
    else setEmailError('');
  }

  // api request to update user information once submit button is pressed, if an error exists it will do nothing
  const updateInfo = () => {
    if(usernameError || emailError) return;

    axios.post("https://localhost:5001/api/user/profileUpdate", {
      id: userInfo.id,
      email: userInfo.email,
      username: userInfo.username,
      avatar: userInfo.avatar,
      bio: userInfo.bio
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(function (res){
      setEditInfoModal(!editInfoModal);
      setCurrentInfo({...userInfo})
      setSuccess("Profile successfully updated")
      console.log(res)
    })
    .catch(function (error){
      if(error.response.data.includes("Username")) setUsernameError("Username is already taken.")
      if(error.response.data.includes("Email")) setEmailError("Email is already taken.")
    })
  }

  // to show the update modal for users to edit their information
  const toggleEditInfoModal = () => setEditInfoModal(!editInfoModal);

  // this resets information upon pressing the X button or the Close button in the Modal
  const resetInfo = () =>{
    setUserInfo({...currentInfo})
    setUsernameError("");
    setEmailError("");
    setSuccess("");
    setEditInfoModal(!editInfoModal)
  } 

  return (
    <div>
      <Card className="card">
        <CardBody className="cardBody">
          <CardImg className="avatar rounded-circle" id="profileImg" src={userInfo.avatar ? userInfo.avatar : defaultProfilePic}></CardImg>
          <ListGroup className="listgroup" type="unstyled">
            <ListGroupItem>
              <label className="mr-2">Username:
                <CardText className="editText" id="userName" name="userName">{userInfo.username}</CardText>
              </label>
            </ListGroupItem>

            <ListGroupItem>
              <label className="mr-2">Email:
                <CardText className="editText" id="email" name="email" defaultValue="testguy@test.com">{userInfo.email}</CardText>
              </label>
            </ListGroupItem>
          </ListGroup>
        </CardBody>

        <CardBody>
          <div>
            <CardText name='bio'>{userInfo.bio}</CardText>
          </div>
        </CardBody>

        <CardFooter className="editFooter">
          <Button color="primary" onClick={toggleEditInfoModal}>Edit Profile</Button>
        </CardFooter>
      </Card>

      <Alert className="rounded" color="success" hidden={!success}>{success}</Alert>

      <Modal isOpen={editInfoModal} toggle={resetInfo} className="modal">
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
                <Input type="textarea" name={"bio"} id="bio" defaultValue={currentInfo.bio} onChange={handleChange}></Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label for="avatar"> Avatar Link:
                <Input name={"avatar"} id="avatar" defaultValue={currentInfo.avatar} onChange={handleChange}></Input>
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