import React, { useEffect, useState } from 'react';
import { Card, CardText, CardTitle, Col, Container, Row, Popover, PopoverBody } from 'reactstrap';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import axios from 'axios'
import UserCard from './UserCard';

// Rendering a message box
const Message = (props) => {
	const [user, setUser] = useState({})
	const [userCardPopover, setUserCardPopover] = useState(false)

	const toggleCard = async (event) => {
		setUserCardPopover(!userCardPopover)
		if(userCardPopover === false){
			await axios.get('https://localhost:5001/api/User/getUserInfo', {
				params: {
					username: event.target.innerText
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
		else return null
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
							<CardTitle><small>{props.date}</small><strong id={"popoverFocus"}>{props.user}</strong>:</CardTitle>
							<Popover toggle={(e) => toggleCard(e)} placement={"right"} target="popoverFocus" isOpen={userCardPopover}> 
								{userCardPopover && user ? <PopoverBody><UserCard user={user}/></PopoverBody> : ''}
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