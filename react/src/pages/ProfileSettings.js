import React, { Component, useEffect, useState } from 'react';
import { Alert, Box, Button, Container, Grid, Paper, Snackbar, styled, TextField } from '@mui/material';
import validator from 'validator';
import { Services } from '../services/Services';
import { useNavigate } from 'react-router-dom';

export function ProfileSettings() {
    const navigate = useNavigate();
  const [paymentKey, setPaymentKey] = useState("");
  const [paymentKeyError, setPaymentKeyError] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const [paymentValueError, setPaymentValueError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [btnName, setBtnName] = useState("Submit");
  
  const [open, setOpen] = React.useState(false);
  const [tokenID, setTokenID] = React.useState(localStorage.getItem("secure-id"));
  const [disabled, setDisabled] = React.useState(tokenID==1?false:true);
 
  useEffect(()=>{

        const request = new Services;

        request.GetAuthMethod("viewpaymentkeyvalue").then((m)=>{
            let company = m.data.data[0];
            localStorage.setItem("company_name",company.company_name);
            setPaymentKey(company.payment_key);
            setPaymentValue(company.payment_value);
            setCompanyName(company.company_name);
        });

    },[]);

  const submitForm = async (event) => {
      setBtnName("Loading...");
      event.preventDefault();

      if(validator.isEmpty(paymentKey)){
          setPaymentKey("Payment Key is empty");
          setTimeout(()=>{
            setPaymentKeyError("");
          },2000);
          return;
      }

      if(validator.isEmpty(paymentValue)){
          setPaymentValueError("Payment Value is empty");
          setTimeout(()=>{
            setPaymentValueError("");
          },2000);
          return;
      }

      if(validator.isEmpty(companyName)){
          setCompanyNameError("Company Name is empty");
          setTimeout(()=>{
            setCompanyNameError("");
          },2000);
          return;
      }
      
      const request = new Services;



      let data = {"paymentkey":paymentKey,"paymentvalue":paymentValue,"companyname":companyName};
      const n = await request.PostAuthMethod("editpaymentsettings",data);
      
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
              <h4 style={{fontSize:"36px", textAlign:"center", margin:"20px 0px 100px 0px"}}>Profile</h4>
                <Box sx={{ flexGrow: 1 }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                    </Alert>
                </Snackbar>
                    <Grid container>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"text"} value={companyName} label="Company Name" onChange={(e)=>{ setCompanyName(e.target.value) }} helperText={companyNameError?companyNameError:''} error={companyNameError?true:false} disabled={disabled}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"text"} value={paymentValue} label="Contact" onChange={(e)=>{ setPaymentValue(e.target.value) }} helperText={paymentValueError?paymentValueError:''} error={paymentValueError?true:false} disabled={disabled}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField type={"text"} value={paymentKey} label="Payment Key" onChange={(e)=>{ setPaymentKey(e.target.value) }} helperText={paymentKeyError?paymentKeyError:''} error={paymentKeyError?true:false} disabled={disabled}></TextField>
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