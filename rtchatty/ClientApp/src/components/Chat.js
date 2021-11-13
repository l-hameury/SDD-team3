import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import SearchKeyword from './SearchKeyword';
import SortMessages from './SortMessages';
import { Container } from 'reactstrap';
import ChatNavMenu from './ChatNav';

const Chat = (props) => {
	const [connection, setConnection] = useState(null);
	const [chat, setChat] = useState([]);
	const [messagesEnd, setMessagesEnd] = useState();
	const [searchmodal, setSearchModal] = useState(false);
	const [sortmodal, setSortModal] = useState(false);
	const latestChat = useRef(null);
	const [chatNavOpen, setChatNav] = useState();
	const toggleChatNav = () => setChatNav(!chatNavOpen);
	const username = useState(localStorage.getItem('username'));
	const userEmail = useState(localStorage.getItem('email'));
	const avatar = localStorage.getItem('avatar');
	const channel = (props.match.params.channel) ? props.match.params.channel : "General Chat";

	latestChat.current = chat;

	/**
	 * This declares the Hub Connection
	 */
	useEffect(() => {
		const newConnection = new HubConnectionBuilder()
			.withUrl("https://localhost:5001/chatHub")
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build();

		setConnection(newConnection);
	}, []);

	/**
	 * This establishes the connection to the Hub and calls a function
	 * That declares the Client side Hub Methods
	 */
	useEffect(() => {
		async function startConnection() {
			if (connection) {
				await connection.start();
				try {
					console.log('connected');

					// connection.invoke("Join");
					updateConnectionID();

					// Prepare Client methods for Hub
					prepareClientHubMethods();

					// Populate with a list of messages
					getAllMessages(channel);
				}
				catch (e) {
					console.log('Connection failed: ', e)
				};
			}
		}

		startConnection();
	}, [connection]);

	useLayoutEffect(()=>{
		if(connection && connection.connectionStarted){
			console.log('calling get all messages');
			setChat([]);
			getAllMessages( (props.match.params.channel) ? props.match.params.channel : "General Chat", connection.connectionId);
		}
	},[props.match.params.channel]);

	/**
	 * Client Hub Methods are methods declared here
	 * That the Hub (server-side) uses to communicate 
	 * with the front-end
	 */
	function prepareClientHubMethods() {

		// Populate all message history on load (runs one time)
		connection.on('PopulateMessages', messageList => {
			// TODO: Probably do this server-side with connection ID
			// Only pull all messages if there currently are no messages
			if (latestChat.current.length === 0) {
				messageList.forEach(element => {
					let messages = { user: element.message.user, recipient: element.message.recipient, avatar: element.user.avatar, message: element.message.message, 
						timestamp: element.message.timestamp , channel: element.message.channel}
					const updatedChat = [...latestChat.current];
					if(messages.channel == channel){
						updatedChat.push(messages);
						setChat(updatedChat);
					}
				});
			}
		});

		connection.on('ChangeChannels', messageList => {
			// TODO: Probably do this server-side with connection ID
			messageList.forEach(element => {
				let messages = { user: element.message.user, recipient: element.message.recipient, avatar: element.user.avatar, message: element.message.message, 
					timestamp: element.message.timestamp , channel: element.message.channel}
				const updatedChat = [...latestChat.current];
				// if(messages.channel == channel){
					updatedChat.push(messages);
					setChat(updatedChat);
				// }
			});
		});

		// Handle Receive Message functionality from Hub
		connection.on('ReceiveMessage', message => {
			
			message.avatar = avatar;
			const updatedChat = [...latestChat.current];
			console.log('message channel is: ', message.channel);
			console.log('state channel is: ', channel);
			if(message.channel == channel){
				updatedChat.push(message);
				setChat(updatedChat);
			}

			scrollToBottom();
		});

		connection.on('EditMessage', (oldMsg, newMsg) => {
			newMsg.avatar = avatar
			newMsg.recipient = oldMsg.recipient
			const updatedChat = [...latestChat.current]
			const index = updatedChat.map(function(x){return x.message}).indexOf(oldMsg.message)
			updatedChat.splice(index, 1, newMsg)
			setChat(updatedChat)
		})
	}

	/**
	 * Call Hub endpoint to send a message
	 * Add specific User & Group to the Hub server side
	 * 		For chat rooms, DMs, etc.
	 */
	const sendMessage = async (user, message, recipient) => {

		const chatMessage = {
			user: user,
			message: message,
			recipient: recipient,
			channel: channel,
		};
		if (connection.connectionStarted) {
			try {
				await axios.post('https://localhost:5001/Chat/messages', chatMessage);
			}
			catch (e) {
				console.log('Sending message failed', e);
			}
		}
		else {
			alert('No connection to server yet.');
		}
		scrollToBottom();
	}

	/**
	 * Call Hub endpoint to pull all existing messages
	 */
	const getAllMessages = async (channel, connectionId) => {
		if (connection.connectionStarted) {
			try {
				await axios.get('https://localhost:5001/Chat/getAll', {
					params: {
						channel: channel,
						connectionId: connectionId
					}
				});
			}
			catch (e) {
				console.log('Retrieving message failed', e);
			}
		}
		else {
			alert('No connection yet');
		}
		scrollToBottom();
	}

	/**
	 * Scroll to the bottom of the chat window
	 */
	const scrollToBottom = () => {
		messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	/**
	 * Provide connectionID and username to the user DB
	 */
	const updateConnectionID = async () => {
		if(connection.connectionStarted){
			let connectionId = connection.connectionId
			let usernameFixed = username[0];
			try {
				await axios.put('https://localhost:5001/api/user/updateConnection', {Username: usernameFixed, connectionId});
			}
			catch (e) {
				console.log('Updating connection failed', e);
			}
		}
	}
	//sets the modal status to true(show)/false
	const togglesearch = () => setSearchModal(!searchmodal);

	//sets the modal status to true or false for sorting
	const togglesort = () => setSortModal(!sortmodal);

	return (
		<div>
			<Row>
				<Col xs="2">
					<ChatNavMenu />
				</Col>
				<div className="vr" style={{ backgroundColor: "white", borderLeft: "1px solid #333" }}></div>
				<Col>
					<div>
						<h1>{channel ? channel : "General Chat"}</h1>
						<span>
							<Button onClick={togglesearch}>Search</Button> {'  '}
							<Button onClick={togglesort} >Sort</Button> 
						</span>
						<Modal isOpen={searchmodal} >
							<Row>
								<ModalHeader>Search for Messages{'        '}
									<Button color="danger" onClick={togglesearch}>Close</Button>
								</ModalHeader>
							</Row>
							<ModalBody>
								<SearchKeyword chat={chat} />
							</ModalBody>
						</Modal>
						<Modal isOpen={sortmodal}>
							<Row>
								<ModalHeader>Sort Messages By User or Date{'        '}
									<Button color="danger" onClick={togglesort}>Close</Button>
								</ModalHeader>
							</Row>
							<ModalBody>
								<SortMessages chat={chat}/>
							</ModalBody>
						</Modal>
						<hr />
						<Container className="pb-1 mb-5">
							<ChatWindow chat={chat}/>
							<ChatInput username={username} sendMessage={sendMessage} />
							<div className="pb-5 mb-5" ref={(el) => { setMessagesEnd(el); }} />
						</Container>
					</div >
				</Col>
			</Row>
		</div >
	);
};

export default Chat;