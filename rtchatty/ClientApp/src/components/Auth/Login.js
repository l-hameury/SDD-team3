import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import axios from 'axios';

export default function Login(){

    const [user, setUser] = React.useState({email: "", password: ""});

    function login(event){
        event.preventDefault();
    
        axios
            .post('https://localhost:5001/api/user/authenticate', {
                email: user.email,
                password: user.password,
            })
            .then((res) =>{
                console.log(res);
            })
            .catch((err) =>{
                console.log(err)
            });
        }

    return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh"}}
        direction="row-reverse"
        >
            <Grid item xs={3}>
                <TextField 
                 name="email"
                 type="text" 
                 label="Email" 
                 value={user.email}
                 onChange={(event => setUser ({ ...user, email: event.target.value }))}
                 fullWidth></TextField>
                <TextField
                 type="password"
                 name="password"
                 label="Password"
                 value={user.password}
                 onChange={(event) => 
                    setUser({ ...user, password: event.target.value })    
                }
                 fullWidth>
                 </TextField>
                 <Box mt={2}>
                     <Button variant="contained" color="primary" mt={3} onClick={login}>
                         Login
                     </Button>
                 </Box>
            </Grid>
        </Grid>
    )
}

