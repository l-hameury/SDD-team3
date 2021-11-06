import React, { useState } from 'react'
import {Table} from 'reactstrap'
import moment from 'moment'

const SortMessages = (props) =>{
    
    const [messages, setMessages] = useState(props.chat)
    const [order, setOrder] = useState("ascending") // order state is either asc or desc

    //sort the user or date in descending/ascending order
    const sorting = (header) => {
        if( order === "ascending"){
            const sorted = [...messages].sort((a,b)=>
                a[header].toLowerCase() > b[header].toLowerCase() ? 1 : -1
            );
            setMessages(sorted)
            setOrder("descending")
        }
        if( order === "descending"){
            const sorted = [...messages].sort((a,b)=>
                a[header].toLowerCase() < b[header].toLowerCase() ? 1 : -1
            );
            setMessages(sorted)
            setOrder("ascending")
        }
    }

    return(
            <Table hover bordered>
                <thead>
                    <tr>
                    <th>
                        Message
                    </th>
                    <th onClick={()=>sorting("user")}>
                       User
                    </th>
                    <th onClick={()=>sorting("timestamp")}>
                        Date
                    </th>
                    </tr>
                </thead>
                <tbody>
                   {messages.map((m) =>(
                       <tr key={m.timestamp}>
                           <td>{m.message}</td>
                           <td>{m.user}</td>
                           <td>{moment(m.timestamp).format('YYYY-MM-DD h:mm:ss a')}</td>
                       </tr>
                   ))}
                </tbody>
            </Table>
    )
}

export default SortMessages;