import moment from 'moment';
import React, { useState } from 'react';
import { Card, CardText, CardTitle, Col, Container, Row, Modal, ModalBody, Button, Badge } from 'reactstrap';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";
import axios from 'axios'
import UserCard from './UserCard';
import EditMessageModal from './EditMessageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


// Rendering a message box
const Message = (props) => {
	const [user, setUser] = useState({})
	const [userCardModal, setUserCardModal] = useState(false)
	const [usernameUnderline, setUsernameUnderline] = useState(false)
	const [editMessageButton, setEditButton] = useState(false)
	const [editMsgModal, setEditMsgModal] = useState(false)
	const currentUser = localStorage.getItem("email").toString()
	const [likes, setLikes] = useState(props.likes)
	const [dislikes, setDislikes] = useState(props.dislikes)
	const [liked, setLiked] = useState(props.likes.includes(currentUser))
	const [disliked, setDisliked] = useState(props.dislikes.includes(currentUser))

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

	const likeMessage = async () => {
		if (currentUser) {
			await axios.post('https://localhost:5001/Chat/likeMessage', {
					id: props.id
			})
			.then(function (res) {
			})
			// .catch(function () {
			// 	setUserCardModal(false)
			// })
		}
	}

	const dislikeMessage = async (messageId) => {
		if (currentUser) {
			await axios.post('https://localhost:5001/Chat/dislikeMessage', {
					id: props.id		
			})
			.then(function (res) {
			})
			// .catch(function () {
			// 	setUserCardModal(false)
			// })
		}
	}

	const toggleUnderline = () => setUsernameUnderline(!usernameUnderline)
	const toggleEditButtonT = () => setEditButton(true)
	const toggleEditButtonF = () => setEditButton(false)
	const toggleMsgModal = () => setEditMsgModal(!editMsgModal)

	return (
		<div /* style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }} */>
			<Card body onMouseEnter={toggleEditButtonT} onMouseLeave={toggleEditButtonF}>
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
								<Button 
									color={liked ? "warning" : "primary"} 
									size="sm"
									className="m-1"
									onClick={() => likeMessage()} >
									<FontAwesomeIcon icon={faThumbsUp} transform="grow-5" className="p-0 m-1" />
									<Badge> {props.likes.length} </Badge>
								</Button>
								<Button 
									color={disliked ? "warning" : "danger"} 
									size="sm" 
									className="m-1"
									onClick={() => dislikeMessage()}>
									<FontAwesomeIcon icon={faThumbsDown} transform="grow-5" className="p-0 m-1" />
									<Badge> {props.dislikes.length} </Badge>
								</Button>
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
			<EditMessageModal text={props.message} open={editMsgModal} toggle={toggleMsgModal} username={props.user} timestamp={props.timestamp} likes={props.likes} dislikes={props.dislikes}/>
		</div>
	)
}

export default Message;