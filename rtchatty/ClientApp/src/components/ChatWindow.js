import React from 'react';

import Message from './Message';

const ChatWindow = (props) => {
	const chat = props.chat
		.map(m => <Message
			key={Date.now() * Math.random()}
			timestamp={m.timestamp}
			avatar={m.avatar}
			user={m.user}
			recipient={m.recipient}
			message={m.message}
			likes={m.likes}
			dislikes={m.dislikes} 
			id={m.id}/>);

	return (
		<div>
			{chat}
		</div>
	)
};

export default ChatWindow;