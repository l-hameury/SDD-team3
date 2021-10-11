import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { Container } from 'reactstrap';

const Chat = () => {
	const [connection, setConnection] = useState(null);
	const [chat, setChat] = useState([]);
	const latestChat = useRef(null);

	latestChat.current = chat;

	useEffect(() => {
		const newConnection = new HubConnectionBuilder()
			.withUrl("/chatHub")
			.withAutomaticReconnect()
			.build();

		setConnection(newConnection);
	}, []);

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

	const sendMessage = async (user, message) => {
		const chatMessage = {
			user: user,
			message: message
		};

		if (connection.connectionStarted) {
			try {
				await connection.send('SendMessage', chatMessage);
			}
			catch (e) {
				console.log(e);
			}
		}
		else {
			// TODO: We're not using a separate server here, so.... not super relevant
			alert('No connection to server yet.');
		}
	}

	return (
		<div>
			<h1>General Chat</h1>
			<hr />
			<Container className="pb-100">
				<ChatWindow chat={chat} />
				<ChatInput sendMessage={sendMessage} />
			</Container>
		</div>
	);
};

export default Chat;