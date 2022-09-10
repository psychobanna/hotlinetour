import { Alert, Box, Button, Card, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { Services } from '../services/Services';
import bg from '../assets/bg-2.jpg'; 

export const BookingForm = () => {
    const [agent, setAgent] = React.useState([]);
    const [agentId, setAgentId] = React.useState("");
    const [paymentKey, setPaymentKey] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [ticketQuantity, setTicketQuantity] = React.useState("");
    const [customerTitle, setCustomerTitle] = React.useState("Mr.");
    const [firstName, setFirstName] = React.useState("");
    const [firstNameError, setFirstNameError] = React.useState("");
    const [middleName, setMiddleName] = React.useState("");
    const [middleNameError, setMiddleNameError] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [phoneNumberError, setPhoneNumberError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [termsCondition, setTermsCondition] = React.useState("");
    const [termsConditionError, setTermsConditionError] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [alertType, setAlertType] =  React.useState("");
    const [alertMessage, setAlertMessage] =  React.useState("");
    const [paymentID, setPaymentID] =  React.useState("");
    const [ pageContent, setPageContent ] = React.useState("");
    const [ pageTitle, setPageTitle ] = React.useState("");
    const [fullWidth, setFullWidth] = React.useState(true);
    const [ticketStatus, setTicketStatus] = React.useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const navigate = useNavigate();

    React.useEffect(()=>{
        
        const request = new Services;

        request.GetMethod("viewpaymentkeyvalue").then((m)=>{
            let account = m.data.data[0];
            setPaymentKey(account.payment_key);
            setCompanyName(account.company_name);
        });

        request.GetMethod("viewticket").then((m)=>{
            let ticket = m.data.data[0];
            let price = ticket.price;
            let ticketStatus = ticket.qty == 0?false:true;
            setTicketStatus(ticketStatus);

            console.log(ticketStatus);
            
            setAmount(ticket.price);
        });

        request.GetMethod("viewactiveagent").then((m)=>{
            let resp = [];
            resp = m.data.data;
            resp = resp.map((i,key)=>{
                if(key == 0){
                    // setAgentId(i.id);
                }
                return <MenuItem value={i.id} key={i.id}>{ i.full_name }</MenuItem>;
            })
            
            setAgent([...agent,...resp]);
            
        });

        request.GetMethod("viewactivepage").then((m)=>{
            let page = m.data.data[0];
            setPageContent(page.content);
            setPageTitle(page.name);
        });
    },[]);

    const handleChange = (event) => {
        setAgentId(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setCustomerTitle(event.target.value);
    };

    const goBack = () => {
        setAgentId("");
    }
        
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => {
                resolve(true);
            }

            script.onerror = () => {
                resolve(false);
            }

            document.body.appendChild(script);
        });
    }

    const saveSuccessPayment = async (response) => {

        let data = {
            "agent_id":agentId,
            "title_name":customerTitle,
            "first_name":firstName,
            "middle_name":middleName,
            "last_name":lastName,
            "email":email,
            "phone":phoneNumber,
            "amount":amount,
            "payment_id":response.razorpay_payment_id
        };

        const request = new Services;

        
        let n = await request.PostAuthMethod("addbooking",data);
        
        if(n.data.response_code == 200){

            setAlertMessage("Thank you Booking");
            setAlertType("success");
            setOpen(true);

            setTimeout(()=>{
                setOpen(false);
            },2000);
            
            navigate("/thankyou/"+n.data.data.insert_id);

        }
    }
    
    const payNow = async (amount) =>{

        

        
        if(validator.isEmpty(firstName)){
            setFirstNameError("First Name is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setFirstNameError("");
            },2000);
            return;
        }
        
        if(validator.isEmpty(middleName)){
            setMiddleNameError("Middle Name is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setMiddleNameError("");
            },2000);
            return;
        }
        
        if(validator.isEmpty(lastName)){
            setLastNameError("Last Name is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setLastNameError("");
            },2000);
            return;
        }
        
        if(validator.isEmpty(phoneNumber)){
            setPhoneNumberError("Phone Number is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setPhoneNumberError("");
            },2000);
            return;
        }
        
        if(validator.isEmpty(email)){
            setEmailError("Email is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setEmailError("");
            },2000);
            return;
        }

        if(validator.isEmpty(termsCondition.toString())){
            setAlertMessage("Please check terms & condition.");
            setAlertType("error");
            setOpen(true);
            return;
        }




        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            alert("Fuck you! Check your internet.");
            return;
        }
        
        if(!paymentKey){
            
            setAlertMessage("Key is not available");
            setAlertType("error");
            setOpen(true);
            
            setTimeout(()=>{
                setOpen(false);
            },2000)

            return;
        }
        // (parseFloat(amount) + parseFloat((amount * 0.0205).toFixed(2))) * 100
        const options = {
            key: paymentKey,
            currency: "INR",
            amount: amount * 100,
            name: companyName,
            description: "Thanks for book your tour",
            image:"",
            handler: function (response) {
                setPaymentID(response.razorpay_payment_id);
                saveSuccessPayment(response);
            },
            prefill: {
            name: "code with akky",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        
        paymentObject.on('payment.failed',function (response){
            setAlertMessage(response.error.description);
            setAlertType("error");
            setOpen(true);
            
            setTimeout(()=>{
                setOpen(false);
            },2000)

        });

        paymentObject.open();
    }


    const [openPopup, setOpenPopup] = React.useState(false);

    const handleClickOpenPopup = () => {
      setOpenPopup(true);
    };
  
    const handleClosePopup = () => {
      setOpenPopup(false);
    };

    return <>{ticketStatus?(<div style={{background:`url(${bg})`,height:" 100vh", position: "fixed", overflow:"scroll", width:"100%",backgroundSize: "cover",backgroundPosition: "center"}}><Dialog
                open={openPopup}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={false}
                maxWidth={false}>
                <DialogTitle id="alert-dialog-title">
                    {pageTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div dangerouslySetInnerHTML={{__html: pageContent}}></div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Close</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                {alertMessage}
                </Alert>
            </Snackbar>
            <Box sx={{ minWidth: 120, paddingTop:"30px",paddingRight:"30px", textAlign:"right" }}>
                {agentId && <Button variant="contained" onClick={goBack}>Back</Button>}
            </Box>
            <Card maxWidth="sm" style={{width:"100%" ,maxWidth:"360px",margin:"10% auto", padding:"30px"}}>
                <Box sx={{ minWidth: 120 }} style={{padding:"20px 0px 50px 0px", textAlign:"center"}}>
                    <h2>Book Your Trip</h2>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    {!agentId && 
                    <FormControl fullWidth>
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <InputLabel id="demo-simple-select-label">Agent</InputLabel>
                            <Select
                            style={{width:"100%"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={agentId}
                            label="Agents"
                            onChange={handleChange}>
                                {
                                    agent
                                }
                            </Select>
                        </Box>
                    </FormControl>
                    }
                    {agentId && <>
                    <FormControl fullWidth >
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <InputLabel id="demo-simple-select-label">Title</InputLabel>
                            <Select
                            style={{width:"100%"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={customerTitle}
                            label="Title"
                            onChange={handleChangeTitle}
                            >
                                <MenuItem value={"Mr."} >{ "Mr." }</MenuItem>
                                <MenuItem value={"Mrs."} >{ "Mrs." }</MenuItem>
                                <MenuItem value={"Ms"} >{ "Ms" }</MenuItem>
                                <MenuItem value={"Miss"} >{ "Miss" }</MenuItem>
                            </Select>
                        </Box>
                    </FormControl>
                    <FormControl fullWidth >
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <TextField id="outlined-basic" label="First Name" onChange={(e)=>{ setFirstName(e.target.value) }} value={firstName} style={{width:"100%"}} helperText={firstNameError?firstNameError:''} error={firstNameError?true:false}/>
                        </Box>
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <TextField id="outlined-basic" label="Middle Name" onChange={(e)=>{ setMiddleName(e.target.value) }} value={middleName} style={{width:"100%"}} helperText={middleNameError?middleNameError:''} error={middleNameError?true:false}/>
                        </Box>
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <TextField id="outlined-basic" label="Last Name" onChange={(e)=>{ setLastName(e.target.value) }} value={lastName} style={{width:"100%"}} helperText={lastNameError?lastNameError:''} error={lastNameError?true:false}/>
                        </Box>
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <TextField id="outlined-basic" label="Email" onChange={(e)=>{ setEmail(e.target.value) }} value={email} style={{width:"100%"}} helperText={emailError?emailError:''} error={emailError?true:false}/>
                        </Box>
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <TextField id="outlined-basic" label="Phone Number" onChange={(e)=>{ setPhoneNumber(e.target.value) }} value={phoneNumber} style={{width:"100%"}} helperText={phoneNumberError?phoneNumberError:''} error={phoneNumberError?true:false}/>
                            </Box>
                        <Box sx={{ minWidth: 120, marginBottom:"24px" }}>
                            <Checkbox {...label} value="1" onChange={(e)=>{ setTermsCondition(1) }}/><span style={{color: "#256eb7", cursor:"pointer"}} onClick={handleClickOpenPopup}>Privacy & Policy</span>
                        </Box>
                        <Box sx={{ minWidth: 120, marginBottom:"24px", textAlign:"center" }}>
                            <Button variant="contained" onClick={() => {payNow(amount)}}>Pay Now</Button>
                        </Box>
                    </FormControl></>}
                </Box>
            </Card>            
        </div>):(<div style={{height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"}}>Sorry, Ticket Sold Out!</div>)}</>;
};