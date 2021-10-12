//import React from 'react'
import { Container, Button, Typography, TextArea, Grid } from '@material-ui/core'
import useStyles from '../styles/conversationStyles'


import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Radio from '@mui/material/Radio';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import PersonIcon from '@mui/icons-material/Person';
import SampleData from '../Assets/sample.json'


export default function SelectedListItem() {


    const [name, changeName] = useState('No Recipient...')
  return (
            <Container maxWidth="xl" container="true" spacing={2}>
                <Box display="flex">
                    <Box flexGrow={1} style={{borderStyle:"solid"}}>
                        <h2>Conversation</h2>
                        {name}
                    </Box>

                    <Box>
                        <Box p={2}>
                            <input />
                            <Button variant="contained" color="primary">Add</Button>
                        </Box>
                        
                    {SampleData.map((info, id) =>{
                        return(
                            <Box display="flex">
                                <ListItemButton onClick={(e) => changeName(info.username)}>
                                    <ListItemIcon spacing={2}>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText>{info.username}</ListItemText>
                                    <Radio defaultChecked={info.isOnline} disabled/>
                                </ListItemButton>
                            </Box>
                        )})}
                    </Box>
                </Box>

            </Container>
  );
}

//export default Conversation
