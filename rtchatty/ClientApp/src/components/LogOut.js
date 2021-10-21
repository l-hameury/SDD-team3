import {NavLink} from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import React from 'react'
import { Alert} from "reactstrap";
/*Routing for LogOut added in App.js and Component call from NavMenu */

function LogOut() {
    // history object for url 
    let history = useHistory();

    // clears token from localStorage, redirects to home page upon reload, which will load the login page
    function handleLogout(){
        localStorage.clear();
        history.push({pathname: '/'})
        window.location.reload();
    }
    // grabs the token from localStorage
    const checkToken = localStorage.getItem('token')
    
    // if there is a token, then render the nav link to display on navbar
    if(checkToken){
        return(
            <NavLink tag={Link} onClick={handleLogout} className="text-dark" to="/logout">
                Logout
            </NavLink>
        );
    }
    // else render the message before user logs out
    return(
     
       <div>
           <Alert color="success">
               <h4 className="text-center alert-heading">Logging Out</h4>
           </Alert>
       </div>
    )
}
export default LogOut;