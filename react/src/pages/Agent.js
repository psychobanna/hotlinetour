import styled from '@emotion/styled';
import { Alert, Box, Button, Card, CardContent, FormControlLabel, Grid, IconButton, Link, Paper, Snackbar, Switch, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from '../components/DataTable';
import validator from 'validator';
import { Services } from '../services/Services';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { DesktopDatePicker } from '@mui/x-date-pickers';

export function Agent(props){
    const [rows, setRows] = useState([]);
    const [agent, setAgent] = useState(true);
    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passportNum, setPassportNum] = useState("");
    const [passportNumError, setPassportNumError] = useState("");
    const [passportDOB, setPassportDOB] = useState("");
    const [passportDOBError, setPassportDOBError] = useState("");
    const [passportIssue, setPassportIssue] = useState("");
    const [passportIssueError, setPassportIssueError] = useState("");
    const [passportExpiry, setPassportExpiry] = useState("");
    const [passportExpiryError, setPassportExpiryError] = useState("");
    const [passportContact, setPassportContact] = useState("");
    const [passportContactError, setPassportContactError] = useState("");
    const [passportStatus, setPassportStatus] = useState(1);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [loader, setLoader] = useState("Submit");
    const [open, setOpen] = React.useState(false);
    
    const { id } = useParams();

    useEffect(()=>{

        const request = new Services;
        
        if(id){
            console.log(id);
            setAgent(!agent);
            request.GetAuthMethod("viewagent/"+id).then((m)=>{
                let agent = m.data.data[0];
                setFullName(agent.full_name);
                setEmail(agent.email);
                setPassportContact(agent.contact);
                setPassportDOB(agent.passport_dob);
                setPassportExpiry(agent.passport_expiry);
                setPassportIssue(agent.passport_issue);
                setPassportNum(agent.passport_num);
                setPassportStatus(agent.status);
                console.log(agent);
            });

        }

        function fetchData(){
            request.GetAuthMethod("viewagent").then((m)=>{
                let resp = [];
                resp = m.data.data;
                console.log(resp);
                resp.map((p)=>{
                    const btn = {"delete":<IconButton><DeleteIcon /></IconButton>};
                    const finalResult = Object.assign(p,btn);
                    return finalResult;
                })
                setRows([...rows,...resp]);
                return m.data.data;
            });
        }
        fetchData();
    },[])

    const changePage = () => {
        setAgent(!agent);
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'full_name', headerName: 'Full name', width: 130 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'contact', headerName: 'Contact', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const Delete = (e) => {
                    const request = new Services;
                    e.stopPropagation();

                    request.DeleteAuthMethod("deleteagent",params.id).then((m)=>{
                        console.log(m);
                        if(m.data.data){
                            request.GetAuthMethod("viewagent").then((m)=>{
                                let resp = [];
                                resp = m.data.data;
                                console.log(resp);
                                resp.map((p)=>{
                                    const btn = {"delete":<IconButton><DeleteIcon /></IconButton>};
                                    const finalResult = Object.assign(p,btn);
                                    return finalResult;
                                })
                                setRows([]);
                                setRows(resp);
                                return m.data.data;
                            });

                            if(m.data.response_code == 200){
                                setAlertMessage(m.data.message);
                                setAlertType("success");
                                setOpen(true);
                            }
                        }
                    })
                    console.log(params.id);

                }

                const Edit = (e) => {
                    e.stopPropagation();
                    window.location.href = "/agent/"+params.id;

                    console.log(e);
                }
                return <><Button onClick={Delete}><IconButton><DeleteIcon /></IconButton></Button><Link href={"agent/"+params.id}><IconButton><EditIcon /></IconButton></Link></>;
            }
        }
    ];
        
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const onChangeUsername = (e) =>{
        setUsername(e.target.value);
    }

    const submitForm = async () => {
        setLoader("Loading");
        if(validator.isEmpty(fullName)){
            setFullNameError("Full Name is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setFullNameError("");
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

        
        if(!validator.isEmail(email)){
            setEmailError("Email is not valid");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setEmailError("");
            },2000);
            return;
        }

        if(validator.isEmpty(passportNum)){
            setPassportNumError("Passport Number is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setPassportNumError("");
            },2000);
            return;
        }

        if(validator.isEmpty(passportDOB.toString())){
            setPassportDOBError("Passport DOB is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setPassportDOBError("");
            },2000);
            return;
        }

        if(validator.isEmpty(passportIssue.toString())){
            setPassportIssueError("Passport Issue is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setPassportIssueError("");
            },2000);
            return;
        }

        if(validator.isEmpty(passportExpiry.toString())){
            setPassportExpiryError("Passport Issue is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setPassportExpiryError("");
            },2000);
            return;
        }
        
        passportContact?passportContact:setPassportContact("");
        
        if(validator.isEmpty(passportContact)){
            setPassportContactError("Contact is empty");
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(()=>{
                setPassportContactError("");
            },2000);
            return;
        }

        const request = new Services;

        let data = {
            "full_name":fullName,
            "email":email,
            "passport_num":passportNum,
            "passport_dob":passportDOB,
            "passport_issue":passportIssue,
            "passport_expiry":passportExpiry,
            "status":passportStatus,
            "contact":passportContact
        };
        
        console.log(data);
        let n = {};
        if(id){
            n = await request.PostAuthMethod("editagent/"+id,data);
        }else{
            n = await request.PostAuthMethod("addagent",data);
        }
        setLoader("Submit");

        if(n.data.response_code == 422){
            console.log(n.data.message);
            setAlertMessage(n.data.message);
            setAlertType("error");
            setOpen(true);

            return;
        }

        console.log(n);
        
        if(n.data.response_code == 200){
            setAlertMessage(n.data.message);
            setAlertType("success");
            setOpen(true);
        }
        

        setTimeout(()=>{
            setOpen(false);
        },2000)

        window.location.href = "agent";
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                {alertMessage}
                </Alert>
            </Snackbar>
            <Container style={{margin:"50px auto"}}>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={8}>
                        <h4 style={{fontSize:"36px", textAlign:"left", margin:"20px 0px 50px 0px"}}>{agent?"View Agent":"Add Agent"}</h4>
                    </Grid>
                    <Grid item md={6} xs={4} style={{fontSize:"36px", textAlign:"right", margin:"20px 0px 50px 0px"}}>                    
                        {agent && <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{changePage()}}>
                            <rect width="48" height="48.2462" rx="10" fill="#007FFF"/>
                            <path d="M44.1247 23.7842C44.1247 16.6929 38.6222 11.875 32.4997 11.875C26.4418 11.875 20.8747 16.5896 20.8747 23.8617C20.0997 24.3008 19.583 25.1275 19.583 26.0833V28.6667C19.583 30.0875 20.7455 31.25 22.1663 31.25H23.458V23.3708C23.458 18.3721 27.5009 14.3292 32.4997 14.3292C37.4984 14.3292 41.5413 18.3721 41.5413 23.3708V32.5417H31.208V35.125H41.5413C42.9622 35.125 44.1247 33.9625 44.1247 32.5417V30.9658C44.8868 30.5654 45.4163 29.7775 45.4163 28.8475V25.8767C45.4163 24.9725 44.8868 24.1846 44.1247 23.7842V23.7842Z" fill="white"/>
                            <path d="M28.6247 26.0833C29.338 26.0833 29.9163 25.505 29.9163 24.7917C29.9163 24.0783 29.338 23.5 28.6247 23.5C27.9113 23.5 27.333 24.0783 27.333 24.7917C27.333 25.505 27.9113 26.0833 28.6247 26.0833Z" fill="white"/>
                            <path d="M36.3747 26.0833C37.088 26.0833 37.6663 25.505 37.6663 24.7917C37.6663 24.0783 37.088 23.5 36.3747 23.5C35.6613 23.5 35.083 24.0783 35.083 24.7917C35.083 25.505 35.6613 26.0833 36.3747 26.0833Z" fill="white"/>
                            <path d="M40.2499 22.2471C39.9419 20.4312 39.0013 18.7828 37.5948 17.5937C36.1882 16.4046 34.4063 15.7515 32.5644 15.75C28.6507 15.75 24.4399 18.9921 24.7757 24.0812C26.3685 23.4295 27.7753 22.3937 28.8706 21.0662C29.9659 19.7388 30.7157 18.1609 31.0532 16.4733C32.7453 19.8704 36.2199 22.2083 40.2499 22.2471Z" fill="white"/>
                            <path d="M8.81212 31V16H11.1879V31H8.81212ZM3 24.7727V22.2273H17V24.7727H3Z" fill="#F4F9FF"/>
                        </svg>}
                        
                        {!agent && <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{changePage()}}>
                            <rect width="48" height="48.2462" rx="10" fill="#007FFF"/>
                            <path d="M44.1247 23.7842C44.1247 16.6929 38.6222 11.875 32.4997 11.875C26.4418 11.875 20.8747 16.5896 20.8747 23.8617C20.0997 24.3008 19.583 25.1275 19.583 26.0833V28.6667C19.583 30.0875 20.7455 31.25 22.1663 31.25H23.458V23.3708C23.458 18.3721 27.5009 14.3292 32.4997 14.3292C37.4984 14.3292 41.5413 18.3721 41.5413 23.3708V32.5417H31.208V35.125H41.5413C42.9622 35.125 44.1247 33.9625 44.1247 32.5417V30.9658C44.8868 30.5654 45.4163 29.7775 45.4163 28.8475V25.8767C45.4163 24.9725 44.8868 24.1846 44.1247 23.7842V23.7842Z" fill="white"/>
                            <path d="M28.6247 26.0833C29.338 26.0833 29.9163 25.505 29.9163 24.7917C29.9163 24.0783 29.338 23.5 28.6247 23.5C27.9113 23.5 27.333 24.0783 27.333 24.7917C27.333 25.505 27.9113 26.0833 28.6247 26.0833Z" fill="white"/>
                            <path d="M36.3747 26.0833C37.088 26.0833 37.6663 25.505 37.6663 24.7917C37.6663 24.0783 37.088 23.5 36.3747 23.5C35.6613 23.5 35.083 24.0783 35.083 24.7917C35.083 25.505 35.6613 26.0833 36.3747 26.0833Z" fill="white"/>
                            <path d="M40.2499 22.2471C39.9419 20.4312 39.0013 18.7828 37.5948 17.5937C36.1882 16.4046 34.4063 15.7515 32.5644 15.75C28.6507 15.75 24.4399 18.9921 24.7757 24.0812C26.3685 23.4295 27.7753 22.3937 28.8706 21.0662C29.9659 19.7388 30.7157 18.1609 31.0532 16.4733C32.7453 19.8704 36.2199 22.2083 40.2499 22.2471Z" fill="white"/>
                            <path d="M3 18.875C3 18.3777 3.19754 17.9008 3.54917 17.5492C3.90081 17.1975 4.37772 17 4.875 17H16.125C16.6223 17 17.0992 17.1975 17.4508 17.5492C17.8025 17.9008 18 18.3777 18 18.875V30.125C18 30.6223 17.8025 31.0992 17.4508 31.4508C17.0992 31.8025 16.6223 32 16.125 32H4.875C4.37772 32 3.90081 31.8025 3.54917 31.4508C3.19754 31.0992 3 30.6223 3 30.125V18.875ZM17.0625 20.75H13.3125V23.5625H17.0625V20.75ZM17.0625 24.5H13.3125V27.3125H17.0625V24.5ZM17.0625 28.25H13.3125V31.0625H16.125C16.3736 31.0625 16.6121 30.9637 16.7879 30.7879C16.9637 30.6121 17.0625 30.3736 17.0625 30.125V28.25ZM12.375 31.0625V28.25H8.625V31.0625H12.375ZM7.6875 31.0625V28.25H3.9375V30.125C3.9375 30.3736 4.03627 30.6121 4.21209 30.7879C4.3879 30.9637 4.62636 31.0625 4.875 31.0625H7.6875ZM3.9375 27.3125H7.6875V24.5H3.9375V27.3125ZM3.9375 23.5625H7.6875V20.75H3.9375V23.5625ZM8.625 20.75V23.5625H12.375V20.75H8.625ZM12.375 24.5H8.625V27.3125H12.375V24.5Z" fill="white"/>
                        </svg>}

                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{margin:"0px 0px 150px 0px"}}>
                    {agent &&<Grid item md={12} xs={12}>
                         <DataTable rows={rows} columns={columns}/>
                    </Grid>}
                
                    {!agent &&<>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <TextField type={"text"} style={{width:"250px"}} value={fullName} label="Full Name" onChange={(e)=>{ setFullName(e.target.value) }} helperText={fullNameError?fullNameError:''} error={fullNameError?true:false}></TextField>
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <TextField type={"text"} style={{width:"250px"}} value={email} label="Email" onChange={(e)=>{ setEmail(e.target.value) }} helperText={emailError?emailError:''} error={emailError?true:false}></TextField>
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <TextField type={"text"} style={{width:"250px"}} value={passportNum} label="Passport Number" onChange={(e)=>{ setPassportNum(e.target.value) }} helperText={passportNumError?passportNumError:''} error={passportNumError?true:false}></TextField>
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <TextField type={"date"} style={{width:"250px"}} value={passportDOB} label="Passport Date of Birth" onChange={(e)=>{ setPassportDOB(e.target.value) }} helperText={passportDOBError?passportDOBError:''} error={passportDOBError?true:false}></TextField>
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <TextField type={"date"} style={{width:"250px"}} value={passportIssue} label="Passport Issue Date" onChange={(e)=>{ setPassportIssue(e.target.value) }} helperText={passportIssueError?passportIssueError:''} error={passportIssueError?true:false}></TextField>
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <TextField type={"date"} style={{width:"250px"}} value={passportExpiry} label="Passport Expiry Date" onChange={(e)=>{ setPassportExpiry(e.target.value) }} helperText={passportExpiryError?passportExpiryError:''} error={passportExpiryError?true:false}></TextField>
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <span style={{color: "red"}}>{passportContactError?passportContactError:""}</span>
                        <PhoneInput defaultCountry="IN" style={{width:"250px",margin:"auto"}} label="Contact" placeholder="Enter phone number" value={passportContact} onChange={(e)=>{ setPassportContact(e) }} />
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <FormControlLabel control={<Switch checked={passportStatus==1?true:false} onClick={()=>{setPassportStatus(passportStatus==1?0:1)}}/>} label="Status" />
                    </Grid>
                    <Grid xs={12} Item textAlign={"center"} p={2}>
                        <Button variant="contained" onClick={()=>{submitForm()}} disabled={loader == "Loading"?true:false}>{loader}</Button>
                    </Grid>

                    </>}
                </Grid>
            </Container>
        </div>
    );
};