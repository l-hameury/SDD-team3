import React, { useState } from 'react';

// File to render our User and message inputs at the top of the screen

const ChatInput = (props) => {
	// default state for user and message fields
	const [user, setUser] = useState('');
	const [message, setMessage] = useState('');

	const onSubmit = (e) => {
		// Prevent refresh
		e.preventDefault();

		// Checking for user can be done with the DB later on... but for now I'm modifying the ReactJS/SignalR tutorial
		// here: https://medium.com/swlh/creating-a-simple-real-time-chat-with-net-core-reactjs-and-signalr-6367dcadd2c6

		// Determine that the user and message fields are not empty
		const isUserProvided = user && user !== '';
		const isMessageProvided = message && message !== '';

		if (isUserProvided && isMessageProvided) {
			props.sendMessage(user, message);
		}
		else {
			alert('Please insert a user and a message');
		}
	}

	// Update the User and Message variable values based on the input fields provided in the template
	const onUserUpdate = (e) => {
		setUser(e.target.value);
	}

	const onMessageUpdate = (e) => {
		setMessage(e.target.value);
	}

	// The actual input form
	return (
		<form
			onSubmit={onSubmit}>
			<label htmlFor="user">User:</label>
			<br />
			<input
				id="user"
				name="user"
				value={user}
				onChange={onUserUpdate} />
			<br />
			<label htmlFor="message">Message:</label>
			<br />
			<input
				type="text"
				id="message"
				name="message"
				value={message}
				onChange={onMessageUpdate} />
			<br /><br />
			<button>Submit</button>
		</form>
	)
};

export default ChatInput;