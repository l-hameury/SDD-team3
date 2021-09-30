import React, { useState } from "react";
import { Alert, Button, Col, Form, Input, Label, Row } from "reactstrap";
import axios from 'axios';

const Register = () => {

    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        fieldErrors: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        validateField(name, value);
    }
    
    const validateField = (name, value) => {
        // Validate the field changed
        switch(name) {
            case 'email':
                if(value.trim() === "" || value.length == 0) {
                    errors.email = "Email is required";
                } else {
                    errors.email = "";
                }
                break;
            case 'username':
                if (value.trim() === "") {
                    errors.username = "Username is required.";
                } else if(value.length < 3) {
                    errors.username = "Username must be at least 3 characters long";
                } else {
                    errors.username = "";
                }
                break;
            case 'password':
                if(value.trim() === "") {
                    errors.password = "Password is required.";
                } else if(value !== inputs.confirmPassword) {
                    errors.confirmPassword = "Passwords must match."
                } else if(!value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")) {
                    errors.password = "Password must be at least 6 characters long, and contain a lowercase and uppercase letter, one number, and one special character.";
                } else {
                    errors.password = "";
                }
                break;
            case 'confirmPassword':
                if(value.trim() === "") {
                    errors.confirmPassword = "Password is required.";
                } else if(value !== inputs.password) {
                    errors.confirmPassword = "Passwords must match."
                } 
                if(!value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")) {
                    errors.confirmPassword = "Password must be at least 6 characters long, and contain a lowercase and uppercase letter, one number, and one special character.";
                } else {
                    errors.confirmPassword = "";
                }
                break;
            default:
                break;
        }
        // Update the corresponding field in the state
        setInputs({...inputs, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email/username are already in use
        //Axios call here//////////////
        
        // Make sure no fields are currently invalid
        for (const [key, value] of Object.entries(inputs)) {
            validateField(key, value);
        }
        
        errors.fieldErrors = (errors.email || errors.username || errors.password || errors.confirmPassword);
        
        if(errors.fieldErrors) {
            return;
        }
        
        // Send the new user info to the backend for processing
        await axios.post('https://localhost:5001/api/user/register', {
            email: inputs.email,
            username: inputs.username,
            password: inputs.password
          })
          .then(function (res){
            console.log(res)
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log('New user -> ', e.username)

        // Display success message
        setShowSuccess(true);

        //(MAYBE?) Send the user an email
    };

    const errorClass = (error) => {
        return(error.length === 0 ? '' : 'is-invalid');
    }

    return (
        <div>
            <h1 className="mb-3">Register a New User</h1>
            <div className="alert alert-success" hidden={!showSuccess} name="successAlert">Success! An account has been created. Return to login to sign-in.</div>
            <div className="container registerContainer border border-dark rounded">
                <Form className="p-3 needs-validation" onSubmit={handleSubmit} noValidate>
                    <Row className="mb-4">
                        <Col>
                            <div className="form-floating">
                                <Input type="email" className={"form-control " + errorClass(errors.email)} name="email" id="emailInput" placeholder="name@example.com" value={inputs.email} onChange={handleInput} />
                                <Label for="emailInput" className="form-label">Email Address</Label>
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <Input type="text" className={"form-control " + errorClass(errors.username)} name="username" id="usernameInput" placeholder="Ex: coolguy123" value={inputs.username} onChange={handleInput} required/>
                                <Label for="usernameInput" className="form-label">Desired Username</Label>
                                <div className="invalid-feedback">{errors.username}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <div className="form-floating">
                                <Input type="password" className={"form-control " + errorClass(errors.password)} name="password" id="passwordInput" placeholder="Password" value={inputs.password} onChange={handleInput} />
                                <Label for="passwordInput" className="form-label">Password</Label>
                                <div className="invalid-feedback">{errors.password}</div>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <Input type="password" className={"form-control " + errorClass(errors.confirmPassword)} name="confirmPassword" id="confirmPasswordInput" placeholder="Confirm Password" value={inputs.confirmPassword} onChange={handleInput} />
                                <Label for="confirmPasswordInput" className="form-label">Confirm Password</Label>
                                <div className="invalid-feedback">{errors.confirmPassword}</div>
                            </div>
                        </Col>
                    </Row>
                    <Button color="primary" type="submit" value="Submit">Sign Up</Button>
                </Form>
            </div>
        </div>
    )
}

export default Register;