import React, { useState } from 'react'
import { 
	Modal, ModalHeader, ModalBody,
	ModalFooter, Form, FormGroup, Label,
	Input, Button, Alert } from 'reactstrap'
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PasswordModal = (props) => {
	const [currentPass, setCurrentPass] = useState("")
	const [newPass, setNewPass] = useState("")
	const [confirmPass, setConfirmPass] = useState("")
	const [passwordError, setPasswordError] = useState("")

	const reset = () => {
		setCurrentPass("")
		setNewPass("")
		setConfirmPass("")
		setPasswordError("")
	}

	const handlePassword = () => {
		console.log(props.user.password)
		if(currentPass !== props.user.password){
			setPasswordError("Incorrect Password")
			return
		}
		if(!newPass.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")){
			setPasswordError("Password must be at least 6 characters long, and contain a lowercase and uppercase letter, one number, and one special character.")
			return
		}
		if(newPass !== confirmPass){
			setPasswordError("New Passwords must match")
			return
		}

		axios.post('https://localhost:5001/api/User/profileUpdate',{
			id: props.user.id,
			bio: props.user.bio,
			avatar: props.user.avatar,
			password: newPass
		})
		.then(function (res){
			console.log(res)
		})
		.catch(function (err){
			console.log(err)
		})
	}

	if(props.open){
		return(
			<div>
				<Modal isOpen={props.open} toggle={props.toggle} className="updateModal">
					<ModalHeader toggle={reset}>Change Password</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for="currentPassword"> Current Password:
									<Input name={"currentPassword"} onChange={e => setCurrentPass(e.target.value)}></Input>
								</Label>
							</FormGroup>
							<FormGroup>
								<Label for="newPassword"> New Password:
									<Input name={"newPassword"} onChange={e => setNewPass(e.target.value)}></Input>
								</Label>
							</FormGroup>
							<FormGroup>
								<Label for="confirmPassword"> Confirm Password
									<Input name={"confirmPassword"} onChange={e => setConfirmPass(e.target.value)}></Input>
								</Label>
							</FormGroup>
						</Form>
						<Alert color="danger" hidden={!passwordError}>{passwordError}</Alert>
					</ModalBody>
					<ModalFooter>
						<Button color="success" onClick={handlePassword}>Submit</Button>
						<Button color="secondary" onClick={props.toggle}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
	else{
		return(
			<div></div>
		)
	}
}

export default PasswordModal