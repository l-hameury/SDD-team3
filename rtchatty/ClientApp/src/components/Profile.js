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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvZzY5QHRlc3QuY29tIiwibmJmIjoxNjMzNjQxOTEwLCJleHAiOjE2MzM2NDU1MTAsImlhdCI6MTYzMzY0MTkxMH0.sOJhJ84e5YB28wqFCMeFgKJ3PHAlFtleG1KS4aEAoRc"
  // const token = localStorage.getItem('token');

  // im using this hook to initialize user information after rendering component
  // once I am able to get the user email, I can replace the hardcoded email in the params with it to load their information :) 
  useEffect(() => {
    axios.get("https://localhost:5001/api/user/getUserByEmail", {
      params: {
        email: 'dog69@test.com'
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
    if(!error) setUserInfo({ ...userInfo, [key]: value})
  }

  // validation for username
  const validateUsername = (username) => {
    if(username.trim() === "") setError('Username is required');
    else if(username.length < 3) setError('Username must be at least 3 characters long');
    else setError('');
  }
  
  // validation for email
  const validateEmail = (email) => {
    if(email.length === 0) setError('Email is required');
    else if(!email.match("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$")) setError('Invalid Email Format')
    else setError('');
  }

  // api request to update user information once submit button is pressed, if an error exists it will do nothing
  const updateInfo = () => {
    if(error) return;

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
      if(error.response.data.includes("Username")) setError("Username is already taken.")
      if(error.response.data.includes("Email")) setError("Email is already taken.")
    })
  }

  // to show the update modal for users to edit their information
  const toggleEditInfoModal = () => setEditInfoModal(!editInfoModal);

  // this resets information upon pressing the X button or the Close button in the Modal
  const resetInfo = () =>{
    setUserInfo({...currentInfo})
    setError("");
    setSuccess("");
    setEditInfoModal(!editInfoModal)
  } 

  return (
    <div>
      <Card className="card">
        <CardBody className="cardBody">
          <CardImg className="avatar rounded-circle" src={userInfo.avatar ? userInfo.avatar : defaultProfilePic}></CardImg>
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

          <Alert color="danger" hidden={!error}>{error}</Alert>
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