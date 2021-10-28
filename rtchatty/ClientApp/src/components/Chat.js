import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { Container } from 'reactstrap';

const Chat = () => {
	const [connection, setConnection] = useState(null);
	const [chat, setChat] = useState([]);
	const [messagesEnd, setMessagesEnd] = useState();
	const latestChat = useRef(null);
	const user = useState(localStorage.getItem('username'));

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
					console.log('connected')

					console.log('ConnectionId is: ', connection.connectionId)
					
					// connection.invoke("Join");
					updateConnectionID();

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
					let messages = {user: element.user, message: element.message}
					const updatedChat = [...latestChat.current];
					updatedChat.push(messages);
					setChat(updatedChat);
				});
			}
		});

		// Handle Receive Message functionality from Hub
		connection.on('ReceiveMessage', message => {
			
			const updatedChat = [...latestChat.current];
			updatedChat.push(message);

			setChat(updatedChat);

			scrollToBottom();
		});


	}

	/**
	 * Call Hub endpoint to send a message
	 * Add specific User & Group to the Hub server side
	 * 		For chat rooms, DMs, etc.
	 */
	const sendMessage = async (user, message) => {
		// TODO: Add recipient email for private messages
		// Maybe nullable field in object? I dunno yet
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

	/**
	 * Provide connectionID and username to the user DB
	 */
	const updateConnectionID = async () => {
		if(connection.connectionStarted){
			let connectionId = connection.connectionId
			let userName = user[0];
			try {
				await axios.put('https://localhost:5001/api/user/updateConnection', {userName, connectionId});
			}
			catch (e) {
				console.log('Updating connection failed', e);
			}
		}
	}

	return (
		<div>
			<h1>General Chat</h1>
			<hr />
			<Container>
				<ChatWindow chat={chat} />
				<ChatInput user={user} sendMessage={sendMessage} />
				<div className="pb-5 mb-5" ref={(el) => { setMessagesEnd(el); }}/>
			</Container>
		</div>
	);
};

export default Chat;