import moment from 'moment';
import React, { useState } from 'react';
import { Card, CardText, CardTitle, Col, Container, Row, Modal, ModalBody } from 'reactstrap';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import axios from 'axios'
import UserCard from './UserCard';

// Rendering a message box
const Message = (props) => {
	const [user, setUser] = useState({})
	const [userCardModal, setUserCardModal] = useState(false)
	const [usernameUnderline, setUsernameUnderline] = useState(false)

	const toggleCard = async (event) => {

		// In case the recipient is null
		if(event.target.innerText === 'General Chat') {
			return;
		}

		event.persist()
		setUserCardModal(!userCardModal)
		if (userCardModal === false) {
			await axios.get('https://localhost:5001/api/User/getUserInfo', {
				params: {
					username: event.target.innerText
				}
			})
				.then(function (res) {
					setUser(res.data)
				})
				.catch(function () {
					setUserCardModal(false)
				})
		}
	}

	const toggleUnderline = () => setUsernameUnderline(!usernameUnderline)

	return (
		<div /* style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }} */>
			<Card body>
				<Container>
					<Row noGutters>
						<Col xs="auto">
							<img width="40em" src={props.user.avatar ? props.user.avatar : defaultProfilePic} alt="profile pic" ></img>
						</Col>
						<Col>
							<CardTitle>
								<small>{moment(props.timestamp).format('LT')} </small>
								<strong className={usernameUnderline ? 'username' : ''} onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} onClick={e => toggleCard(e)}>{props.user}</strong>
								<p style={{display:"inline"}}> to </p>
								<strong className={usernameUnderline ? 'username' : ''} onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} onClick={e => toggleCard(e)}>{props.recipient ? props.recipient : "General Chat"}</strong>:
							</CardTitle>
							<Modal style={{ width: "350px" }} isOpen={userCardModal} toggle={() => setUserCardModal(!userCardModal)}>
								<ModalBody><UserCard user={user} /></ModalBody>
							</Modal>
							<CardText>{props.message}</CardText>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	)
}

export default Message;