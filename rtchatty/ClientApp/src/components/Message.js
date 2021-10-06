import React from 'react';

// Rendering a message box
const Message = (props) => (
	<div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
		<p><small>{props.date}</small> <strong>{props.user}</strong> says:</p>
		<p>{props.message}</p>
	</div>
)

export default Message;