import React from 'react';

import Message from './Message';

const ChatWindow = (props) => {
	const chat = props.chat
		.map(m => <Message
			key={Date.now() * Math.random()}
			timestamp={m.timestamp}
			avatar={m.avatar}
			user={m.user}
			message={m.message} />);

	return (
		<div>
			{chat}
		</div>
	)
};

export default ChatWindow;