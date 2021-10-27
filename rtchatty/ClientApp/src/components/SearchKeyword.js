import React, {useState} from 'react'
import ListMessages from './ListMessages';


const SearchKeyword = (props) => {
    
    //console.log(chatMsgs)
    const [searchText, setSearchText] = useState('')
    const [messages, setMessages] = useState(props.chat)
  
   

    // if no input is entered, don't show any messages, else show messages with keyword
     const searchMessage = searchText.length === 0 ?  [] : 
    messages.filter(msg => msg.message.toLowerCase().includes(searchText.toLowerCase())) 


    return(
        <div>
            <input  
                type="text"
                placeholder="Search for message..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
          <ListMessages messages={searchMessage}/>
        </div>
    )
}
export default SearchKeyword;