import React from 'react';

// component called by SearchKeyword
function ListMessages({messages}){

    // populates messages inside modal body
    // if message is not found, show No Results
    //msg.id is not pulled in with messages 
    return(
        <div>
            <ul>
                {
                    messages.length> 0 ?
                    messages.map(msg =>(
                    <li key={msg.timestamp}>
                        User: {' '}
                            <span>{msg.user} {', '}</span>
                        Message: {' '}
                            <span>{msg.message}</span>
                    </li>
                )): <h3>No Results</h3>}
            </ul>
        </div>
    )

}
export default ListMessages;