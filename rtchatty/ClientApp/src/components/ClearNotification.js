import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'


const ClearNotification = (props) =>{
    const [notificationCount, setNotificationCount] = useState(0)
    var username = props.username[0]
    var userEmail = props.userEmail

	useEffect(() =>{
		axios.get('https://localhost:5001/api/user/getUserByEmail', {
			params: {
			  email: userEmail[0],
			},
		}).then(function(res){
			const n = res.data.notificationCount;
			setNotificationCount(n)
		})
		.catch(function(error){	
			console.log(`An error occured in Notification component: ${error}`)
		})

	}, [notificationCount])

    const updatenotification = () =>{
        axios.post("https://localhost:5001/api/user/clearnotifications", {username: username}        )
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