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
	const [liked, setLiked] = useState([props.likes].includes(currentUser))
	const [disliked, setDisliked] = useState([props.dislikes].includes(currentUser))

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
					User: props.user,
					Message: props.message,
					Timestamp: props.timestamp,
					Likes: props.likes,
					Dislikes: props.dislikes
			})
			.then(function (res) {
				setLiked(!liked)
			})
			// .catch(function () {
			// 	setUserCardModal(false)
			// })
		}
	}

	const dislikeMessage = async (messageId) => {
		if (currentUser && messageId) {
			await axios.get('https://localhost:5001/Chat/dislikeMessage', {
				params: {
					username: currentUser,
					messageId: messageId
				}
			})
			.then(function (res) {
				setdisLiked(!disliked)
			})
			// .catch(function () {
			// 	setUserCardModal(false)
			// })
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
							<img width="40em" src={props.user.avatar ? props.user.avatar : defaultProfilePic} alt="profile pic" ></img>
						</Col>
						<Col>
							<CardTitle>
								<small>{moment(props.timestamp).format('LT')} </small>
								<strong className={usernameUnderline ? 'username' : ''} onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} onClick={e => toggleCard(e)}>{props.user}</strong>
								<p style={{display:"inline"}}> to </p>
								<strong className={usernameUnderline ? 'username' : ''} onMouseEnter={toggleUnderline} onMouseLeave={toggleUnderline} onClick={e => toggleCard(e)}>{props.recipient ? props.recipient : "General Chat"}</strong>:
								{localStorage.getItem('username') == props.user && editMessageButton
								? <Button size="sm" onClick={toggleMsgModal}>Edit Message</Button>
								: ''}
								<Button 
									color={liked ? "secondary" : "primary"} 
									size="sm"
									className="m-1"
									onClick={() => likeMessage()} >
									<FontAwesomeIcon icon={faThumbsUp} transform="grow-5" className="p-0 m-1" />
									<Badge color={liked ? "secondary" : "primary"} > {[props.likes].length} </Badge>
								</Button>
								<Button 
									color={disliked ? "secondary" : "danger"} 
									size="sm" 
									className="m-1"
									onClick={() => dislikeMessage()}>
									<FontAwesomeIcon icon={faThumbsDown} transform="grow-5" className="p-0 m-1" />
									<Badge outline color={disliked ? "secondary" : "danger"}> {[props.dislikes].length} </Badge>
								</Button>
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