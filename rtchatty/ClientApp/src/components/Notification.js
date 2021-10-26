import React, { useState } from "react";
import "./NavMenu.css";
import axios from 'axios'

const Notification = () =>{
    const [count, setCount] = useState(2)
    const updateNotification = async () =>{
        try{
            await axios.post('https://localhost:5001/Chat/notification')
        } catch(error){
            console.log(`An error occured in Notification component: ${error}`)
        }
    }
    //setCount(updateNotification())

    if(count > 0){
        return(
            <div className= "counter">{count}</div>
        )
    } else{
        return <div></div>
    }
}

export default Notification