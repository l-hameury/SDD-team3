import React from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

const Register = () => {

    return (
        <div>
            <h1 className="mb-3">Register a New User</h1>
            <div className="container registerContainer border border-dark rounded">
                <Form className="p-3 needs-validation" noValidate>
                    <Row className="mb-4">
                        <Col>
                            <div className="form-floating">
                                <Input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
                                <Label for="emailInput" className="form-label">Email Address</Label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <Input type="text" className="form-control" id="usernameInput" placeholder="Ex: coolguy123"/>
                                <Label for="usernameInput" className="form-label">Desired Username</Label>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <div className="form-floating">
                                <Input type="password" className="form-control" id="passwordInput" placeholder="Password" />
                                <Label for="passwordInput" className="form-label">Password</Label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-floating">
                                <Input type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password" />
                                <Label for="confirmPasswordInput" className="form-label">Confirm Password</Label>
                            </div>
                        </Col>
                    </Row>
                    <Button color="primary" type="submit">Sign Up</Button>
                </Form>
            </div>
        </div>
    )
}

export default Register;