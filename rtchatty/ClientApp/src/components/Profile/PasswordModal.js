import React, { useState } from 'react'
import { 
	Modal, ModalHeader, ModalBody,
	ModalFooter, Form, FormGroup, Label,
	Input, Button, Alert } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PasswordModal = (props) => {
	const [currentPass, setCurrentPass] = useState("")
	const [newPass, setNewPass] = useState("")
	const [confirmPass, setConfirmPass] = useState("")
	const [passwordError, setPasswordError] = useState("")
	const [submitError, setSubmitError] = useState("")

	const reset = () => {
		setPasswordError("")
		setSubmitError("")
		props.toggle()
	}

	const handlePassword = () => {
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
		.then(function (){
			props.success("Password Successfully Changed")
			props.toggle()
		})
		.catch(function (err){
			setSubmitError(err)
		})
	}
	return(
		<div>
			<Modal isOpen={props.open} toggle={reset} className="updateModal">
				<ModalHeader toggle={reset}>Change Password</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="currentPassword"> Current Password:
								<Input type="password" name={"currentPassword"} onChange={e => setCurrentPass(e.target.value)}></Input>
							</Label>
						</FormGroup>
						<FormGroup>
							<Label for="newPassword"> New Password:
								<Input type="password" name={"newPassword"} onChange={e => setNewPass(e.target.value)}></Input>
							</Label>
						</FormGroup>
						<FormGroup>
							<Label for="confirmPassword"> Confirm Password
								<Input type="password" name={"confirmPassword"} onChange={e => setConfirmPass(e.target.value)}></Input>
							</Label>
						</FormGroup>
					</Form>
					<Alert color="danger" hidden={!passwordError}>{passwordError}</Alert>
					<Alert color="danger" hidden={!submitError}>{submitError}</Alert>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={handlePassword}>Submit</Button>
					<Button color="secondary" onClick={reset}>Close</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}
export default PasswordModal