import React from 'react';

import Message from './Message';
import moment from 'moment';

const ChatWindow = (props) => {
	const chat = props.chat
		.map(m => <Message
			key={Date.now() * Math.random()}
			date={moment().format('LT')}
			user={m.user}
			message={m.message} />);

	return (
		<div>
			{chat}
		</div>
	)
};

export default ChatWindow;