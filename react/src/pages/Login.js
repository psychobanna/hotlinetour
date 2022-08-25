import React, { Component, useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Grid, Paper, Snackbar, styled, TextField } from '@mui/material';
import validator from 'validator';
import { Services } from '../services/Services';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [open, setOpen] = React.useState(false);
    
    const submitForm = async (event) => {
        event.preventDefault();

        if(validator.isEmpty(username)){
            setUsernameError("Username is empty");
            setTimeout(()=>{
                setUsernameError("");
            },2000);
            return;
        }

        if(validator.isEmpty(password)){
            setPasswordError("Pasword is empty");
            setTimeout(()=>{
                setPasswordError("");
            },2000);
            return;
        }
        
        const request = new Services;

        let data = {"username":username,"password":password};
        const n = await request.PostMethod("login",data);
        
        if(n.data.response_code == 422){
            setAlertMessage(n.data.message);
            setAlertType("error");
            setOpen(true);
            return;
        }
        if(n.data.message.token){
            localStorage.setItem("secure-token",n.data.message.token);
            localStorage.setItem("secure-id",n.data.message.id);
            setOpen(true);
            // window.location.href = "/home"
            navigate("/home");
        }
        // n.data.response_code

    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const onChangeUsername = (e) =>{
        setUsername(e.target.value);
    }

    return (
        <div>                
            <Container xs={12}>
                <Box sx={{ flexGrow: 1 }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                    </Alert>
                </Snackbar>
                    <Grid container>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <img src='' />
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"username"} value={username} label="Username" onChange={(e)=>{ onChangeUsername(e) }} helperText={usernameError?usernameError:''} error={usernameError?true:false}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"password"} value={password} label="Password" onChange={(e)=>{ setPassword(e.target.value) }} helperText={passwordError?passwordError:''} error={passwordError?true:false}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <Button variant="contained" onClick={(e)=>{submitForm(e)}}>Login</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Container>)
        </div>
    );

}

export default Login;