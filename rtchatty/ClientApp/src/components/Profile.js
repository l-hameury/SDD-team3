import React, { useState } from 'react'
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
  const [editInfoModal, setEditInfoModal] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "dog123",
    email: "dog@test.com",
    bio: "i am a dog",
    avatar: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
  })

  const[currentInfo, setCurrentInfo] = useState({...userInfo})

  // const token = localStorage.getItem('token');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvZ2d1eUBkb2cuY29tIiwibmJmIjoxNjMzNTQ3MTUxLCJleHAiOjE2MzM1NTA3NTEsImlhdCI6MTYzMzU0NzE1MX0.7Lu9LKPnXlIaSwioMgchVeVRG5nPicHgB1TROgUbGAE"

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    if(key === 'username') validateUsername(value)
    if(key === 'email') validateEmail(value);
    if(!error) setUserInfo({ ...userInfo, [key]: value})
  }

  const validateUsername = (username) => {
    if(username.trim() === "") setError('Username is required');
    else if(username.length < 3) setError('Username must be at least 3 characters long');
    else setError('');
  }

  const validateEmail = (email) => {
    if(email.length === 0) setError('Email is required');
    else if(!email.match("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$")) setError('Invalid Email Format')
    else setError('');
  }

  const updateInfo = () => {
    if(error){
      console.log(error);
      return;
    } 
    axios.post("https://localhost:5001/api/user/profileUpdate", {
      id: "615c5ecd18264305e84b70b9",
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
      console.log(res)
    })
    .catch(function (error){
      if(error.response.data.includes("Username")) setError("Username is already taken.")
      if(error.response.data.includes("Email")) setError("Email is already taken.")
      console.log(error)
    })
  }

  const toggleEditInfoModal = () => setEditInfoModal(!editInfoModal);
  const resetInfo = () =>{
    setUserInfo({...currentInfo})
    setError("");
    setEditInfoModal(!editInfoModal)
  } 
  return (
    <div>
      <Card className="card">
        <CardBody className="cardBody">
          <CardImg className="avatar rounded-circle" src={userInfo.avatar} alt={defaultProfilePic}></CardImg>
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

      <Modal isOpen={editInfoModal} toggle={resetInfo} className="modal">
        <ModalHeader toggle={resetInfo}>Update your information</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username"> Username:
                <Input name={"username"} id="username" defaultValue={userInfo.username} onChange={handleChange}></Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label for="email"> Email:
                <Input type="email" name={"email"} id="email" defaultValue={userInfo.email} onChange={handleChange}></Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label for="bio"> Bio:
                <Input type="textarea" name={"bio"} id="bio" defaultValue={userInfo.bio} onChange={handleChange}></Input>
              </Label>
            </FormGroup>

            <FormGroup>
              <Label for="avatar"> Avatar Link:
                <Input name={"avatar"} id="avatar" defaultValue={userInfo.avatar} onChange={handleChange}></Input>
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