import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

const Register = () => {

    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        fieldErrors: "",
    });
    const [errors, setErrors] = useState({
        email: {isInvalid: "", message: ""},
        username: {isInvalid: "", message: ""},
        password: {isInvalid: "", message: ""},
        confirmPassword: {isInvalid: "", message: ""},
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value});

        // Validate the field changed
        switch(name) {
            case 'username':
                if(value.length < 3) {
                    errors.username.isInvalid = "is-invalid";
                    errors.username.message = "Username must be at least 3 characters long";
                    return;
                } else {
                    errors.username.isInvalid = "";
                }
                break;
            case 'password':
                if(value !== inputs.confirmPassword) {
                    errors.confirmPassword.isInvalid = "is-invalid";
                    errors.confirmPassword.message = "Passwords must match."
                }
                if(!value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")) {
                    errors.password.isInvalid = "is-invalid";
                    errors.password.message = "Password must be at least 6 characters long, and contain a lowercase and uppercase letter, one number, and one special character.";
                } else {
                    errors.password.isInvalid = "";
                }
                break;
            case 'confirmPassword':
                if(value !== inputs.password) {
                    errors.confirmPassword.isInvalid = "is-invalid";
                    errors.confirmPassword.message = "Passwords must match."
                } else if(!value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")) {
                    errors.confirmPassword.isInvalid = "is-invalid";
                    errors.confirmPassword.message = "Password must be at least 6 characters long, and contain a lowercase and uppercase letter, one number, and one special character.";
                } else {
                    errors.confirmPassword.isInvalid = "";
                }
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make sure no fields are blank

        // Make sure no fields are currently invalid
        //js.lookfor("#is-invalid")

        // Check if email/username are already in use

        // Send the new user info to the backend for processing

        //(MAYBE?) Send the user an email
    };

    return (
        <div>
            <h1 className="mb-3">Register a New User</h1>
            <div className="container registerContainer border border-dark rounded">
                <Form className="p-3 needs-validation" onSubmit={handleSubmit} noValidate>
                    <Row className="mb-4">
                        <Col>
                            <div className="form-floating">
                                <Input type="email" className="form-control" name="email" id="emailInput" placeholder="name@example.com" value={inputs.email} onChange={handleInput} />
                                <Label for="emailInput" className="form-label">Email Address</Label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <Input type="text" className={"form-control " + errors.username.isInvalid} name="username" id="usernameInput" placeholder="Ex: coolguy123" value={inputs.username} onChange={handleInput} required/>
                                <Label for="usernameInput" className="form-label">Desired Username</Label>
                                <div className="invalid-feedback">{errors.username.message}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <div className="form-floating">
                                <Input type="password" className={"form-control " + errors.password.isInvalid} name="password" id="passwordInput" placeholder="Password" value={inputs.password} onChange={handleInput} />
                                <Label for="passwordInput" className="form-label">Password</Label>
                                <div className="invalid-feedback">{errors.password.message}</div>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <Input type="password" className={"form-control " + errors.confirmPassword.isInvalid} name="confirmPassword" id="confirmPasswordInput" placeholder="Confirm Password" value={inputs.confirmPassword} onChange={handleInput} />
                                <Label for="confirmPasswordInput" className="form-label">Confirm Password</Label>
                                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
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