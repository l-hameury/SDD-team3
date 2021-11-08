import React, { useState } from 'react'
import {Table} from 'reactstrap'
import moment from 'moment'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'




const SortMessages = (props) =>{
    
    const [messages, setMessages] = useState(props.chat)
    const [userorder, setUserOrder] = useState("ascending") 
    const [dateorder, setDateOrder] = useState("ascending") 

    //sort the user or date in descending/ascending order
    const sortUserMsg = (header) => {
        if( userorder === "ascending"){
            const sorted = [...messages].sort((a,b)=>
                a[header].toLowerCase() > b[header].toLowerCase() ? 1 : -1
            );
            setMessages(sorted)
            setUserOrder("descending")
        }
        if( userorder === "descending"){
            const sorted = [...messages].sort((a,b)=>
                a[header].toLowerCase() < b[header].toLowerCase() ? 1 : -1
            );
            setMessages(sorted)
            setUserOrder("ascending")
        }
    }

    const sortDateMsg = (header) => {
        if( dateorder === "ascending"){
            const sorted = [...messages].sort((a,b)=>
                a[header].toLowerCase() > b[header].toLowerCase() ? 1 : -1
            );
            setMessages(sorted)
            setDateOrder("descending")
        }
        if( dateorder === "descending"){
            const sorted = [...messages].sort((a,b)=>
                a[header].toLowerCase() < b[header].toLowerCase() ? 1 : -1
            );
            setMessages(sorted)
            setDateOrder("ascending")
        }
    }
 

    return(
            <Table hover bordered>
                <thead>
                    <tr>
                    <th>
                        Message
                    </th>
                    <th onClick={()=>sortUserMsg("user")}>
                       User
                       <span>{userorder === "ascending" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}</span>
                    </th>
                    <th onClick={()=>sortDateMsg("timestamp")}>
                        Date
                        <span>{dateorder === "ascending" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}</span>
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