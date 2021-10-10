import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const Chat = () => {
	const [connection, setConnection] = useState(null);
	const [chat, setChat] = useState([]);
	const latestChat = useRef(null);

	latestChat.current = chat;

	useEffect(() => {
		const newConnection = new HubConnectionBuilder()
			.withUrl("https://localhost:5001/chatHub")
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build();

		setConnection(newConnection);
	}, []);
	
	// Update the chat window with new messages from the server
	useEffect(() => {
		if (connection) {
			connection.start()
				.then(result => {
					console.log('connected')
					connection.on('ReceiveMessage', message => {
						const updatedChat = [...latestChat.current];
						updatedChat.push(message);

						setChat(updatedChat);
					});
				})
				.catch(e => console.log('Connection failed: ', e));
		}
	}, [connection]);

	useEffect(() => {
		if(connection){
			try {
				console.log("Console log here: \n" + connection.on('ReceiveMessage'));			}
			catch (e) {
				console.log('Connection failed', e);
			}
		}

		//TODO: Using this to test once I have a list of messages returning.
		//TODO: For now, just random comments that I will use/remove later.
		// const messagesList = getMessages();
		// const updatedChat = [...messagesList];
		// updatedChat.push(messagesList);

		// setChat(messagesList);
	}, [connection]);

	// Send messages to the ChatHub back-end
	const sendMessage = async (user, message) => {
		const chatMessage = {
			user: user,
			message: message
		};

		if (connection.connectionStarted) {
			try {
				await fetch('https://localhost:5001/Chat/messages', {
					method: 'POST',
					body: JSON.stringify(chatMessage),
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
			catch (e) {
				console.log('Sending message failed', e);
			}
		}
		else {
			// TODO: We're not using a separate server here, so.... not super relevant
			alert('No connection to server yet.');
		}
	}

	// const getMessages = async () => {
	// 	// const chatInfo = {
	// 	// 	group: group,
	// 	// 	user: user
	// 	// };

	// 	// let messages = [];

	// 	try {
	// 		await connection.on('GetMessages');
	// 	}
	// 	catch (e) {
	// 		console.log(e);
	// 	}

	// 	// return messages;
	// }

	return (
		<div>
			<ChatInput sendMessage={sendMessage} />
			<hr />
			<ChatWindow chat={chat} />
		</div>
	);
};

export default Chat;