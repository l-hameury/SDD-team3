import moment from 'moment';
import React, { useState } from 'react';
import { Card, CardText, CardTitle, Col, Container, Row, Modal, ModalBody, Button } from 'reactstrap';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import axios from 'axios'
import UserCard from './UserCard';
import EditMessageModal from './EditMessageModal';

// Rendering a message box
const Message = (props) => {
	const [user, setUser] = useState({})
	const [userCardModal, setUserCardModal] = useState(false)
	const [usernameUnderline, setUsernameUnderline] = useState(false)
	const [editMessageButton, setEditButton] = useState(false)
	const [editMsgModal, setEditMsgModal] = useState(false)
	const toggleCard = async (event) => {
		// In case the recipient is null
		if(event.target.innerText === 'General Chat') return;

		event.persist()
		setUserCardModal(!userCardModal)
		setEditButton(false)
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
	const toggleEditButton = () => setEditButton(!editMessageButton)
	const toggleMsgModal = () => setEditMsgModal(!editMsgModal)

	return (
		<div /* style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }} */>
			<Card body onMouseEnter={toggleEditButton} onMouseLeave={toggleEditButton}>
				<Container>
					<Row noGutters>
						<Col xs="auto">
							<img width="40em" src={props.avatar ? props.avatar : defaultProfilePic} onError={(e) => { e.target.src = defaultProfilePic }} ></img>
						</Col>
						<Col>
							<CardTitle>
								<small>{moment(props.timestamp).format('LT')} </small>
								<strong className={usernameUnderline ? 'username' : ''} onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} onClick={e => toggleCard(e)}>{props.user}</strong>
								<p style={{display:"inline"}}> to </p>
								<strong className={usernameUnderline ? 'username' : ''} onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} onClick={e => toggleCard(e)}>{props.recipient ? props.recipient : "Channel"}</strong>:
								{localStorage.getItem('username') == props.user && editMessageButton
								? <Button size="sm" onClick={toggleMsgModal}>Edit Message</Button>
								: ''}
							</CardTitle>
							<Modal style={{ width: "350px" }} isOpen={userCardModal} toggle={() => setUserCardModal(!userCardModal)}>
								<ModalBody><UserCard user={user} /></ModalBody>
							</Modal>
							<CardText>{props.message}</CardText>
						</Col>
					</Row>
				</Container>
			</Card>
			<EditMessageModal text={props.message} open={editMsgModal} toggle={toggleMsgModal} username={props.user} timestamp={props.timestamp}/>
		</div>
	)
}

export default Message;