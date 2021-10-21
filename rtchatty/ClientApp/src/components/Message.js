import React, { useState } from 'react';
import { Card, CardText, CardTitle, Col, Container, Row, Popover } from 'reactstrap';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import axios from 'axios'
import UserCard from './UserCard';

// Rendering a message box
const Message = (props) => {
	const [user, setUser] = useState(null)
	const [userCardPopover, setUserCardPopover] = useState(false)

	const toggleCard = async (event) => {
		event.persist()
		setUserCardPopover(!userCardPopover)

		await axios.get('https://localhost:5001/api/User/getUserInfo', {
		params: {
			username: event.target.textContent
		}
		})
		.then(function (res){
			setUser(res.data)
			return res.data
		})
		.catch(function (err){
			console.log(err)
		})
	}

	return(
		<div /* style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }} */>
			<Card body>
				<Container>
					<Row noGutters>
						<Col xs="auto">
							<img width="40em" src={props.user.profilePic ? props.user.profilePic : defaultProfilePic} alt="profile pic"></img>
						</Col>
						<Col>
							<CardTitle><small>{props.date} {' '}</small><strong id="popover1" onClick={e => setUser(toggleCard(e))}>{props.user}</strong>:</CardTitle>
							<Popover trigger="focus" placement="right" isOpen={userCardPopover} toggle={toggleCard} target="popover1"> 
								<div><UserCard user={user}/></div>
							</Popover>
							<CardText>{props.message}</CardText>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	)
}

export default Message;