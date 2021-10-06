import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import { Button, Container, Input, InputGroup, InputGroupAddon, Navbar, NavbarText } from 'reactstrap';
// File to render our User and message inputs at the top of the screen

const ChatInput = (props) => {
	// default state for user and message fields
	const [user, setUser] = useState('TestUser');
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
		<form onSubmit={onSubmit}>
			<label hidden={true} htmlFor="user">User:</label>
			<input hidden={true} id="user" name="user" value={user} onChange={onUserUpdate} />

			<Navbar color="dark" dark fixed="bottom">
				<NavbarText className="flex-fill">
					<Container className="rounded bg-secondary pe-0">
						<InputGroup>
							<InputGroupAddon addonType="prepend"><FontAwesomeIcon icon={faHandPointRight} transform="grow-5 left-10 down-8" className="ps-2" /></InputGroupAddon>
							<Input type="text" id="message" name="message" value={message} onChange={onMessageUpdate} className="chatMessageBox bg-secondary border-0 text-light" />
							<InputGroupAddon addonType="append"><Button>Chat</Button></InputGroupAddon>
						</InputGroup>
					</Container>
				</NavbarText>
			</Navbar>
		</form>
	)
};

export default ChatInput;