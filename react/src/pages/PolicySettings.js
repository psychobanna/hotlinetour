import React, { Component, useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Grid, Paper, Snackbar, styled, TextField } from '@mui/material';
import validator from 'validator';
import { Services } from '../services/Services';
import { useNavigate } from 'react-router-dom';
import { DefaultEditor } from 'react-simple-wysiwyg';

export function PolicySettings() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [btnName, setBtnName] = useState("Submit");
  
  const [open, setOpen] = React.useState(false);
  const [tokenID, setTokenID] = React.useState(localStorage.getItem("secure-id"));
  const [disabled, setDisabled] = React.useState(tokenID==1?false:true);
  const [compnayName,setCompnayName] = useState("");
  
 
  useEffect(()=>{

        const request = new Services;

        request.GetAuthMethod("viewactivepage/1").then((m)=>{
            let page = m.data.data[0];
            setName(page.name);
            setContent(page.content);
            setStatus(page.status);
        });
        
        request.GetAuthMethod("viewpaymentkeyvalue").then((m)=>{
          let company = m.data.data[0];
          localStorage.setItem("company_name",company.company_name);
          setCompnayName(company.company_name);
      });
    },[]);

  const submitForm = async (event) => {
      setBtnName("Loading...");
      event.preventDefault();

      if(validator.isEmpty(name)){
          setName("Name is empty");
          setTimeout(()=>{
            setNameError("");
          },2000);
          return;
      }

      if(validator.isEmpty(content)){
          setContentError("New Pasword is empty");
          setTimeout(()=>{
            setContentError("");
          },2000);
          return;
      }
      
      const request = new Services;



      let data = {"name":name,"content":content};
      const n = await request.PostAuthMethod("editpage/1",data);
      
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
                <Box sx={{ flexGrow: 1 }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                    </Alert>
                </Snackbar>
                    <Grid container>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <h4 style={{fontSize:"36px", textAlign:"center", margin:"20px 0px 40px 0px"}}>Privacy Policy</h4>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"text"} value={name} label="Page Title" onChange={(e)=>{ setName(e.target.value) }} helperText={nameError?nameError:''} error={nameError?true:false} disabled={disabled}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"left"} p={2}>
                            <DefaultEditor value={content} onChange={(e)=>{ setContent(e.target.value) }} style={{height: "200px"}}  disabled={disabled}/>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <Button variant="contained" onClick={(e)=>{submitForm(e)}} disabled={disabled}>{ btnName }</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Container>)
        </div>
  );
};