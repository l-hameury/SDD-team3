import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useHistory } from 'react-router';



const Login = ({setToken}) => {

	const[inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        fieldErrors: "",
    });

    // var the 401 error
    const [showAuthError, setShowAuthError] = useState(false);

    //var for useHistory object
    const history = useHistory();

    const handleInput = (e) =>{
        const field = e.target.name;
        const value = e.target.value;

        validateField(field, value)
    }

    const validateField = (field, value) =>{
        switch(field){
            case 'email':
                if (value.trim() === "" || value.length === 0) {
                    errors.email = "Email is required";
                } else {
                    errors.email = "";
                }
            break;
            case 'password':
                // Password meets security requirements
                if (!value.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")) {
                    errors.password = "Password must be at least 6 characters long, and contain a lowercase and uppercase letter, one number, and one special character.";
                } else {
                    errors.password = "";
                }
            break;
        }
        // Update the corresponding field in the state
         setInputs({ ...inputs, [field]: value });
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Make sure no fields are currently invalid
        for (const [key, value] of Object.entries(inputs)) {
            validateField(key, value);
        }

        errors.fieldErrors = (errors.email || errors.password );

        if (errors.fieldErrors) {
            return;
        }

        // Clear 401 error alert box
        setShowAuthError(false);

        //axios call to login user
        async function loginUser(credentials){
        // Hold returnData for... returning. :)
        let returnData;
    
        await axios.post('https://localhost:5001/api/user/authenticate', {
          email: credentials.email,
          password: credentials.password
        })
        .then(function (res) {
          returnData = res.data;
          setOnline({user: localStorage.getItem("email")})
        })
        // TODO: Implement error handling
        .catch(function (error) {
          console.log(error);
          // if there is a 401 response, log it
          if (error.response.status ==='401') {
             console.log(error.response.data);
             console.log(error.response.status);
              // returns null to authData
             return null;
          }
          return error
        })
    
        return returnData;
    }

    
        const setOnline = async () => {
            await axios.post('https://localhost:5001/api/user/setOnline', {
                email: inputs.email
            })
            .catch(function (error) {
                console.log(`An error occured in set-online function of User navcomponent: ${error}`)
            })
        }
        const authData = await loginUser({
            email: inputs.email,
            password: inputs.password
        });
        localStorage.setItem("email", inputs.email);
        // if authData is null then show the error
        if(!authData){ 
            setShowAuthError(true)
            return;
        }
        //else set the token for login
        setToken(authData.token);

        // get the username and avatar for the authenticated user
        let userInfo = await getUserInfo(inputs.email);
        localStorage.setItem("username", userInfo.username);
        localStorage.setItem("avatar", userInfo.avatar);
    }

        //axios call to login user
        async function loginUser(credentials){
            // Hold returnData for... returning. :)
            let returnData;
        
            await axios.post('https://localhost:5001/api/user/authenticate', {
                email: credentials.email,
                password: credentials.password
            })
            .then(function (res) {
                returnData = res.data;
            })
            // TODO: Implement error handling
            .catch(function (error) {
                console.log(error);
                // if there is a 401 response, log it
                if (error.response.status ==='401') {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    // returns null to authData
                    return null;
                }
                return error
            })
        
            return returnData;
        }

    const getUserInfo = async (email) => {

        let returnUserInfo;
    
        await axios.get('https://localhost:5001/api/user/getUserByEmail/', {
            params: {
                email: email
            }
        })
        .then(function (res) {
            console.log(res.data.username);
            returnUserInfo = res.data;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        })
    
        return returnUserInfo;
    }

    // redirects to register page
    const registerPage = () =>{
        history.push("/register");
}

    const errorClass = (error) => {
        return (error.length === 0 ? '' : 'is-invalid');
    }

    return(
        <div>
             <h1 className="mb-3">Please Log In</h1>
             <div className="container registerContainer border border-dark rounded">
             <div className="alert alert-danger" hidden={!showAuthError} name="authAlert">401 Error: Not Authorized. Wrong Email or Password</div>
                <Form className="p-3 needs-validation" onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Col>
                            <div className="form-floating">
                                <Input type="email" className={"form-control " + errorClass(errors.email)} name="email" id="emailInput" placeholder="name@example.com" value={inputs.email} onChange={handleInput} />
                                <Label for="emailInput" className="form-label">Email Address</Label>
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <div className="form-floating">
                                <Input type="password" className={"form-control " + errorClass(errors.password)} name="password" id="passwordInput" placeholder="Password" value={inputs.password} onChange={handleInput} />
                                <Label for="passwordInput" className="form-label">Password</Label>
                                <div className="invalid-feedback">{errors.password}</div>
                            </div>
                        </Col>
                    </Row>
                    <br></br>
                        <Button color="primary" type="submit" value="Submit">Login</Button>{' '}
                        <Button color="primary" type="submit" onClick={registerPage}>Register</Button>{' '}
                </Form>
            </div>

        </div>
    )
	
}
export default Login;