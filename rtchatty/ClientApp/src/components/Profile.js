import React, { useState } from 'react'
import { Button, Card, CardBody,
  CardFooter, CardImg, CardText, 
  Form, FormGroup, Label, Input,
  ListGroup, ListGroupItem, Modal, 
  ModalBody, ModalHeader, ModalFooter} from "reactstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import '../profile.css'
const Profile = () => {
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "dog123",
    email: "dog@test.com",
    bio: "i am a dog",
    avatar: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
  })
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwibmJmIjoxNjMzMzgzMDYzLCJleHAiOjE2MzMzODY2NjMsImlhdCI6MTYzMzM4MzA2M30.tlnFRoYo5wKz78P2SBWmblLeV2LpwF1Scigu6_Zg5wM"

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    updateUserState(name, value);
  }

  const updateUserState = (name, value) => setUserInfo({...userInfo, [name]: value})

  const updateInfo = async (event) => {
    event.preventDefault();
    // await axios.post('https://localhost:5001/api/user/update', {
    //   id: "614e6c015f4990e6e66e9853",
    //   avatar: userInfo.avatar,
    //   bio: userInfo.bio
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //   }
    // })
    // .then(function (res){
    //   console.log(res)
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

const toggleModal = () => {
  setModal(!modal);
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

        <CardBody className="bioBody">
          <div className="userBioField">
            <CardText className="bioInputField" name='bio'>{userInfo.bio}</CardText>
          </div>
        </CardBody>

        <CardFooter className="editFooter">
          <Button color="primary" onClick={toggleModal}>Edit Profile</Button>
        </CardFooter>

      </Card>

      <Modal isOpen={modal} toggle={toggleModal} className="modal">
          <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              
              <FormGroup>
                <Label for="username"> Username:
                  <Input name={"username"} id="username" value={userInfo.username} onChange={handleChange}></Input>
                </Label>
              </FormGroup>

              <FormGroup>
                <Label for="email"> Email:
                  <Input type="email" name={"email"} id="email" value={userInfo.email} onChange={handleChange}></Input>
                </Label>
              </FormGroup>

              <FormGroup>
                <Label for="bio"> Bio:
                  <Input type ="textarea" name={"bio"} id="bio" value={userInfo.bio} onChange={handleChange}></Input>
                </Label>
              </FormGroup>

              <FormGroup>
                <Label for="avatar"> Avatar Link:
                  <Input name={"avatar"} id="avatar" value={userInfo.avatar} onChange={handleChange}></Input>
                </Label>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit" onClick={updateInfo} >Submit</Button>
            <Button color="danger" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
      </Modal>
    </div>
        
      
		);
}

export default Profile