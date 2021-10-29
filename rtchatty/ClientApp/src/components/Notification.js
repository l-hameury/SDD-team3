import React, { useState, useEffect } from "react";
import "./NavMenu.css";
import axios from 'axios'

const Notification = (props) =>{
    var user = props.user
    console.log(`*************************User Name: ${user.username}`)
    const [count, setCount] = useState(2)
    useEffect(() =>{
        try{
            axios.post('https://localhost:5001/Chat/notification', {
                params: {
                    user: user,
                }
            }).then(function(res){
                setCount(res.data)
            }) 
        } catch(error){
            console.log(`An error occured in Notification component: ${error}`)
        }
    })
    if(count > 0){
        return(
            <div className= "counter">{count}</div>
        )
    } else{
        return <div></div>
    }
}

export default Notification