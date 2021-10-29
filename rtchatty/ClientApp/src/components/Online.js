import React, { useState } from "react";
import "./NavMenu.css";

const Online = (props) =>{
    var user = props.user
    console.log(user.isOnline);
    if(user.isOnline === true){
        return(
            <div className= "online">online</div>
        )
    } else{
        return <div className= "offline">offline</div>
    }
}

export default Online