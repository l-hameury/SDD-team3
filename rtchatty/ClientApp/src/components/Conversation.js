import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, TextArea, Grid } from '@material-ui/core'
import Box from '@mui/material/Box';
import UserNav from './UserNav';
import Radio from '@mui/material/Radio';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import SampleData from '../Assets/sample.json'
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAdGVzdC5jb20iLCJuYmYiOjE2MzQwODMzNTIsImV4cCI6MTYzNDA4Njk1MiwiaWF0IjoxNjM0MDgzMzUyfQ._mUzudi59yzBkg0e9DVgIl78um3LPyllgV4tU3ZsRpo`;



export default function SelectedListItem() {
    const [user, searchUser] = useState('');
    const [userData, setUserData] = useState([]);
    const [q, setQ] = useState("");
    const [name, changeName] = useState('No Recipient...')

    
    useEffect(() => {
        // i wrapped the api request into a function
        // const search = async () => {
        fetch(`https://localhost:5001/api/User/searchUsers/`, {
        method: "POST",
        headers: new Headers({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(q),
        })
        .then((response) => response.json())
        .then((json) => {
            setUserData(json);
        });
    }, [q]);

  return (
            <Container maxWidth="xl" container="true" spacing={2}>
                <Box display="flex">

                    {/* Display Conversation here */}

                    <Box height={500} flexGrow={1} style={{borderStyle:"solid"}}>
                        <h2>Conversation</h2>
                        {name}
                    </Box>
                    
                    {/* Display Friend list here */}

                    <Box>
                        {/* Search button */}
                        <Box p={2}>
                            <input type="text" placeholder="Find a friend..." onChange={event =>{searchUser(event.target.value)}} />
                            <Button variant="contained" color="primary">Add</Button>
                        </Box>
                        {userData.filter((info) =>{
                                if(user == "") {
                                    return "test"
                                } else if((info.username.toLowerCase().includes((user.toLowerCase())))){
                                    return info
                                }
                            }).map((info, key) =>{
                                return(
                                    <Box display="flex">
                                        <ListItemButton key={key} onClick={(e) => changeName(info.username)}>
                                            <ListItemIcon spacing={2}>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText>{info.username}</ListItemText>
                                            <Radio defaultChecked={info.isOnline} disabled/>
                                        </ListItemButton>
                                    </Box>
                                )
                            })}
                    </Box>
                </Box>

            </Container>
  );
}

//export default Conversation
