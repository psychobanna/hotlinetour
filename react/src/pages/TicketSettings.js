import { Alert, Box, Button, Container, Grid, Snackbar, TextField } from '@mui/material';
import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services/Services';
import validator from 'validator';

export function TicketSettings(props) {


  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [qty, setQty] = useState("");
  const [qtyError, setQtyError] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState("Submit");
  const [tokenID, setTokenID] = React.useState(localStorage.getItem("secure-id"));
  const [disabled, setDisabled] = React.useState(tokenID==1?false:true);
  
  useEffect(()=>{

      const request = new Services;

      
      request.GetAuthMethod("viewticket").then((m)=>{
        let ticket = m.data.data[0];
        setPrice(ticket.price);
        setQty(ticket.qty);
      });

  },[]);

  const submitForm = async (event) => {
      event.preventDefault();
      setLoader("Loading...");

      if(validator.isEmpty(price)){
          setPriceError("Price is empty");
          setTimeout(()=>{
              setPriceError("");
          },2000);
          return;
      }

      if(validator.isEmpty(qty)){
          setQtyError("Quantity is empty");
          setTimeout(()=>{
              setQtyError("");
          },2000);
          return;
      }
      
      const request = new Services;

      let data = {"price":price,"qty":qty};
      const n = await request.PostAuthMethod("editticket",data);
      
      setLoader("submit");
      if(n.data.response_code == 422){
          setAlertMessage(n.data.message);
          setAlertType("error");
          setOpen(true);
          return;
      }
      
      setAlertMessage(n.data.message);
      setAlertType("success");
      setOpen(true);

      // window.location.href = "/"
  }
  
  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
  };

  const onChangePrice = (e) =>{
      setPrice(e.target.value);
  }

  return (
                <Box sx={{ flexGrow: 1 }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                    </Alert>
                </Snackbar>
                    <Grid container>
                        <Grid item md={12} xs={12}>
                            <h4 style={{fontSize:"36px", textAlign:"center", margin:"100px 0px 50px 0px"}}>Ticket</h4>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField style={{width:"400px"}} type={"text"} value={price} label="Price" disabled={disabled} onChange={(e)=>{ onChangePrice(e) }} helperText={priceError?priceError:''} error={priceError?true:false}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <TextField style={{width:"400px"}} type={"text"} value={qty} label="Quantity" disabled={disabled} onChange={(e)=>{ setQty(e.target.value) }} helperText={qtyError?qtyError:''} error={qtyError?true:false}></TextField>
                        </Grid>
                        <Grid xs={12} Item textAlign={"center"} p={2}>
                            <Button variant="contained" onClick={(e)=>{submitForm(e)}} disabled={disabled} >{loader}</Button>
                        </Grid>

                    </Grid>
                </Box>
          );
};