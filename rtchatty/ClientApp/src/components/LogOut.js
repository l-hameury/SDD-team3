import { NavLink } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import React from 'react'
import axios from 'axios'
/*Routing for LogOut added in App.js and Component call from NavMenu */

function LogOut() {
    
    const setOffline = async () => {
        await axios.post('https://localhost:5001/api/user/setOffline', {
            email: localStorage.getItem("email")
        })
        .catch(function (error) {
            console.log(`An error occured in set-offline function of logout button : ${error}`)
        })
    }
    // history object for url 
    let history = useHistory();

    // clears token from localStorage, redirects to home page upon reload, which will load the login page
    function handleLogout() {
        setOffline()
        localStorage.clear();
        history.push({ pathname: '/' })
        window.location.reload();
    }
    // grabs the token from localStorage
    const checkToken = localStorage.getItem('token')

    // if there is a token, then render the nav link to display on navbar
    if (checkToken) {
        return (
            <NavLink tag={Link} onClick={handleLogout} className="text-dark" to="/logout">
                Logout
            </NavLink>
        );
    }

    else return null;

}
export default LogOut;