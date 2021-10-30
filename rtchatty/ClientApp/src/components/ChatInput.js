import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Button, Collapse, Container, Input, InputGroup, InputGroupAddon, Navbar, NavbarText, } from 'reactstrap';
import ChatCmdTable from './ChatCmdTable';
import Emoticons  from '../Assets/Emoticons/Emoticons';
// File to render our User and message inputs at the top of the screen

const ChatInput = (props) => {
	// default state for message field, get user from props
	const [message, setMessage] = useState('');
	const user = props.username[0];
	const [showCommands, setShowCommands] = useState(false);

	const onSubmit = async (e) => {
		// Prevent refresh
		e.preventDefault();

		// Checking for user can be done with the DB later on... but for now I'm modifying the ReactJS/SignalR tutorial
		// here: https://medium.com/swlh/creating-a-simple-real-time-chat-with-net-core-reactjs-and-signalr-6367dcadd2c6

		// Determine that the message field is not empty
		const isMessageProvided = message && message !== '';
		let msgToSend = message; //Doing this since setState(message) doesn't update before the render

		// Check if the user sent a command
		if (message.charAt(0) === "/") {
			msgToSend = await runCommand();
		}

		if (isMessageProvided) {
			props.sendMessage(user, msgToSend);
			// clear the input box
			setMessage('');
			setShowCommands(false);
		}
	}

	// Update the Message variable value based on the input field
	const onMessageUpdate = async (e) => {
		setMessage(e.target.value);
		
		// While the first character is a "/" pull up the command list
		if (e.target.value.charAt(0) === "/") {
			setShowCommands(true);
		} else {
			setShowCommands(false);
		}
	}

	const runCommand = async () => {

		let newMessage;
		let command = message.substring(0, message.indexOf(' ')) !== '' ? message.substring(0, message.indexOf(' ')) : message;

		switch(command) {
			case "/happy":
				newMessage = message.replace(command, Emoticons[Math.floor(Math.random()*Emoticons.length)]);
				break;
			case "/shrug":
				newMessage = message.replace(command, "¯\\\_(ツ)_/¯");
				break;
			case "/legion":
				newMessage = message.replace(command, "(-'(-'(' - ')-')-')");
				break;
		}
		
		return newMessage;
	}

	// The actual input form
	return (
		<form onSubmit={onSubmit} autoComplete="off">
			<Navbar color="dark" dark fixed="bottom">
				<Collapse navbar isOpen={showCommands}>
					<ChatCmdTable/>
				</Collapse>
				<NavbarText className="flex-fill">
					<Container className="rounded bg-secondary pe-0">
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<FontAwesomeIcon icon={faHandPointRight} transform="grow-5 left-10 down-8" className="ps-2" />
							</InputGroupAddon>
							<Input type="text" id="message" name="message" value={message} onChange={onMessageUpdate} className="chatMessageBox bg-secondary border-0 text-light" />
							<InputGroupAddon addonType="append">
								<Button><FontAwesomeIcon icon={faPaperPlane} /></Button>
							</InputGroupAddon>
						</InputGroup>
					</Container>
				</NavbarText>
			</Navbar>
		</form>
	)
};

export default ChatInput;