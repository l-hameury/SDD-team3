import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Row  } from 'reactstrap';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { Container } from 'reactstrap';

const Chat = () => {
	const [connection, setConnection] = useState(null);
	const [chat, setChat] = useState([]);
	const [messagesEnd, setMessagesEnd] = useState();
	const [modal, setModal] = useState(false);
	const latestChat = useRef(null);
	const username = useState(localStorage.getItem('username'));
	const avatar = localStorage.getItem('avatar');

	latestChat.current = chat;
	console.log(latestChat.current)

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
					console.log('connected')
					
					// Prepare Client methods for Hub
					prepareClientHubMethods();

					// Populate with a list of messages
					getAllMessages();
				}
				catch (e) 
				{
					console.log('Connection failed: ', e)
				};
			}
		}

		startConnection();
	}, [connection]);

	/**
	 * Client Hub Methods are methods declared here
	 * That the Hub (server-side) uses to communicate 
	 * with the front-end
	 */
	function prepareClientHubMethods(){
		
		// Populate all message history on load (runs one time)
		connection.on('PopulateMessages', messageList => {
			// TODO: Probably do this server-side with connection ID
			// Only pull all messages if there currently are no messages
			if(latestChat.current.length === 0){
				messageList.forEach(element => {
					let messages = {user: element.message.user, avatar: element.user.avatar, message: element.message.message, timestamp: element.message.timestamp}
					const updatedChat = [...latestChat.current];
					updatedChat.push(messages);
					setChat(updatedChat);
				});
			}
		});

		// Handle Receive Message functionality from Hub
		connection.on('ReceiveMessage', message => {
			message.avatar = avatar;
			const updatedChat = [...latestChat.current];
			updatedChat.push(message);

			setChat(updatedChat);
		});
	}

	/**
	 * Call Hub endpoint to send a message
	 * TODO: Add specific User & Group to the Hub server side
	 * 		For chat rooms, DMs, etc.
	 */
	const sendMessage = async (user, message) => {
		const chatMessage = {
			user: user,
			message: message
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
			// TODO: We're not using a separate server here, so.... not super relevant
			alert('No connection to server yet.');
		}
		scrollToBottom();
	}

	/**
	 * Call Hub endpoint to pull all existing messages
	 */
	const getAllMessages = async () => {
		console.log("Get message called here! \n");
		if(connection.connectionStarted) {
			try {
				await axios.get('https://localhost:5001/Chat/getAll');
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
		messagesEnd.scrollIntoView({ behavior: "smooth"});
	}

	//sets the modal status to true(show)/false
	const toggle = () => setModal(!modal);

	return (
		<div>
			<h1>General Chat</h1>
			<Button onClick={toggle}>Search</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<Row><ModalHeader>Search for Messages{'        '}
					<Button color="danger" onClick={toggle}>Close</Button></ModalHeader>
				</Row>
				<ModalBody>
				</ModalBody>
			</Modal>
			<hr />
			<Container>
				<ChatWindow chat={chat} />
				<ChatInput username={username} sendMessage={sendMessage} />
				<div className="pb-5 mb-5" ref={(el) => { setMessagesEnd(el); }}/>
			</Container>
		</div>
	);
};

export default Chat;