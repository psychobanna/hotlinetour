import React, { Component, useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Grid, Paper, Snackbar, styled, TextField } from '@mui/material';
import validator from 'validator';
import { Services } from '../services/Services';
import { useNavigate } from 'react-router-dom';

export function ChangePassword(props) {
    
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [btnName, setBtnName] = useState("Submit");
  
  const [open, setOpen] = React.useState(false);

  const submitForm = async (event) => {
      setBtnName("Loading...");
      event.preventDefault();

      if(validator.isEmpty(oldPassword)){
          setOldPasswordError("Old is empty");
          setTimeout(()=>{
              setOldPasswordError("");
          },2000);
          return;
      }

      if(validator.isEmpty(newPassword)){
          setNewPasswordError("New Pasword is empty");
          setTimeout(()=>{
              setNewPasswordError("");
          },2000);
          return;
      }
      
      const request = new Services;



      let data = {"oldpassword":oldPassword,"newpassword":newPassword};
      let userID = localStorage.getItem("secure-id");
      const n = await request.PostAuthMethod("changepassword/"+userID,data);
      
      if(n.data.response_code == 422){
          setAlertMessage(n.data.message);
          setAlertType("error");
      }
      
      if(n.data.response_code == 404){
        setAlertMessage(n.data.message);
        setAlertType("error");
      }

      if(n.data.response_code == 200){
        setAlertMessage(n.data.message);
        setAlertType("success");
      }
      setOpen(true);
      setBtnName("Submit");
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
              <h2 style={{fontSize:"50px", textAlign:"center", margin:"100px 0px 20px 0px"}}>{ localStorage.getItem("company_name")?localStorage.getItem("company_name"):"Sagar Hotline"}</h2>
              <h4 style={{fontSize:"36px", textAlign:"center", margin:"20px 0px 100px 0px"}}>Change Password</h4>
                <Box sx={{ flexGrow: 1 }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                    </Alert>
                </Snackbar>
                    <Grid container>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"password"} value={oldPassword} label="Old Password" onChange={(e)=>{ setOldPassword(e.target.value) }} helperText={oldPasswordError?oldPasswordError:''} error={oldPasswordError?true:false}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"password"} value={newPassword} label="New Password" onChange={(e)=>{ setNewPassword(e.target.value) }} helperText={newPasswordError?newPasswordError:''} error={newPasswordError?true:false}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <Button variant="contained" onClick={(e)=>{submitForm(e)}}>{ btnName }</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Container>)
        </div>
  );
};