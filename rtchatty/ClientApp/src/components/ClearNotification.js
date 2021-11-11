import React, {useState} from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'


const ClearNotification = (props) =>{
    const [notificationCount, setNotificationCount] = useState(10)
    var username = props.username

    const updatenotification = async() =>{
        const user = {username: username}
        await axios.post('https://localhost:5001/api/user/clearnotifications', user)
        .then(function(res){
            setNotificationCount(res.data.notificationCount)
        })
        .catch(function(error){
            console.log(`An error occured in the Clear Notification Component: username = ${username} Error: ${error}`)
        })
    }

    if(notificationCount > 0){
        return <Button onClick = {updatenotification} className="btn btn-info">Mark as read...</Button>
    }else{
        return <div></div>
    }
}
export default ClearNotification;