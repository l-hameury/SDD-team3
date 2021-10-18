import React, { useState, useEffect } from 'react'
import { Alert, Button, Form,
	FormGroup, Label, Input,Modal, ModalBody, 
	ModalHeader, ModalFooter } from "reactstrap";
import axios from 'axios'

const EditModal = (props) => {
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");

	const [infoToUpdate, setInfoToUpdate] = useState({...props.user})

	useEffect(() => {
		setInfoToUpdate({...props.user})
	}, [props.user])
	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;
	
		if (key === "username") validateUsername(value);
		if (key === "email") validateEmail(value);
		// if (!usernameError || !emailError) setUserInfo({ ...userInfo, [key]: value });
		if (!usernameError || !emailError) setInfoToUpdate({...infoToUpdate, [key]: value})
	};
	
	// to update userInfo booleans on input change
	const handleBool = (event) => {
		const key = event.target.name;
		const value = event.target.checked;
	
		// setUserInfo({ ...userInfo, [key]: value });
		setInfoToUpdate({...infoToUpdate, [key]: value})
	};

	// validation for username
	const validateUsername = (username) => {
		if (username.trim() === "") setUsernameError("Username is required");
		else if (username.length < 3) setUsernameError("Username must be at least 3 characters long");
		else setUsernameError("");
	};
	
	// validation for email
	const validateEmail = (email) => {
		if (email.length === 0) setEmailError("Email is required");
		else if (!email.match("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$")) setEmailError("Invalid Email Format");
		else setEmailError("");
	};

	// api request to update user information once submit button is pressed, if an error exists it will do nothing
	const updateInfo = () => {
		if (usernameError || emailError) return;
	
		axios.post("https://localhost:5001/api/user/profileUpdate", {
			id: infoToUpdate.id,
			email: infoToUpdate.email,
			username: infoToUpdate.username,
			avatar: infoToUpdate.avatar,
			bio: infoToUpdate.bio,
			canSearch: infoToUpdate.canSearch,
			statusShow: infoToUpdate.statusShow,
			canMessage: infoToUpdate.canMessage,
			status: infoToUpdate.status
		})
		.then(function (res) {
			props.success("Profile successfully updated!")
			props.toggle()
			props.setUser({...infoToUpdate})
			localStorage.setItem('email', res.data.email)
		})
		.catch(function (error) {
			if (error.response.data.includes("Username")) setUsernameError("Username is already taken.");
			if (error.response.data.includes("Email")) setEmailError("Email is already taken.");
		});
	};
	
	return(
		<Modal isOpen={props.open} toggle={props.reset}>
			<ModalHeader toggle={props.reset}>Update your information</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for="username">{" "} Username:
							<Input name={"username"} id="username" defaultValue={infoToUpdate.username} onChange={handleChange}></Input>
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="email">{" "} Email:
							<Input type="email" name={"email"} id="email" defaultValue={infoToUpdate.email} onChange={handleChange}></Input>
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="bio">{" "} Bio:
							<Input style={{ width: "150%", height: "10rem" }} type="textarea" name={"bio"} id="bio" defaultValue={infoToUpdate.bio} onChange={handleChange}></Input>
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="avatar">{" "} Avatar Link:
							<Input style={{ width: "150%" }} name={"avatar"} id="avatar" defaultValue={infoToUpdate.avatar} onChange={handleChange}></Input>
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="status"> Status:
							<Input style={{ width: "150%", height: "10rem" }} type="textarea" name={"status"} id="status" defaultValue={infoToUpdate.status} onChange={handleChange}></Input>
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="canSearch">
							<Input type="checkbox" name={"canSearch"} id="canSearch" defaultChecked={infoToUpdate.canSearch} onChange={handleBool}/>
							{" "} Searchable
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="statusShow">
							<Input type="checkbox" name={"statusShow"} id="statusShow" defaultChecked={infoToUpdate.statusShow} onChange={handleBool}/>
							{" "} Show Status
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="canMessage">
							<Input type="checkbox" name={"canMessage"} id="canMessage" defaultChecked={infoToUpdate.canMessage} onChange={handleBool}/>
							{" "} Allow Messages From Anyone
						</Label>
					</FormGroup>
				</Form>
				<Alert color="danger" hidden={!usernameError}>{usernameError}</Alert>
				<Alert color="danger" hidden={!emailError}>{emailError}</Alert>
			</ModalBody>
			<ModalFooter>
			<Button color="success" onClick={updateInfo}>Submit</Button>
			<Button color="danger" onClick={props.reset}>Cancel</Button>
			</ModalFooter>
    	</Modal>
	)
}

export default EditModal