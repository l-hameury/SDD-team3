import React, { useState, useEffect } from "react";
import "./NavMenu.css";
import axios from 'axios'

const Notification = (props) =>{
    var user = props.user
    const [count, setCount] = useState(0)
    useEffect(() =>{
        axios.get('https://localhost:5001/api/user/getUserByEmail', {
            params: {
                email: user.email,
            },
        })
        .then(function(res){
            setCount(res.data.notificationCount)
        })
        .catch(function(error){
            console.log(' error in notification')
            console.log(`An error occured in Notification component: ${error}`)
        })
    }, [count])
    if(count > 0){
        return(
            <div className= "counter">{count}</div>
        )
    } else{
        return <div></div>
    }
}

export default Notification