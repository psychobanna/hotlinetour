import styled from '@emotion/styled';
import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

export function Settings(props) {
  return (
    <div>
        <Container style={{margin:"50px auto"}}>
            <h2 style={{fontSize:"50px", textAlign:"center", margin:"100px 0px 20px 0px"}}>Sagar Hotline</h2>
            <h4 style={{fontSize:"36px", textAlign:"center", margin:"20px 0px 100px 0px"}}>Settings</h4>
            <Grid container spacing={2}>
                <Grid item md={3} xs={6}>
                    <Link to="/changepassword" style={{textDecoration:"none",color:"#fff"}}>
                        <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer"}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="#fff" gutterBottom style={{fontFamily: 'Maven Pro',fontStyle: "normal",fontWeight:"500",fontSize:"36px",lineHeight:"28px",marginTop:"20px"}}>
                                Password
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Link to="/ticketsettings" style={{textDecoration:"none",color:"#fff"}}>
                        <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer"}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="#fff" gutterBottom style={{fontFamily: 'Maven Pro',fontStyle: "normal",fontWeight:"500",fontSize:"36px",lineHeight:"28px",marginTop:"20px"}}>
                                    Ticket
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Link to="/policysettings" style={{textDecoration:"none",color:"#fff"}}>
                        <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer"}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="#fff" gutterBottom style={{fontFamily: 'Maven Pro',fontStyle: "normal",fontWeight:"500",fontSize:"36px",lineHeight:"28px",marginTop:"20px"}}>
                                    Policy
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item md={3} xs={6}>
                    <Link to="/profilesettings" style={{textDecoration:"none",color:"#fff"}}>
                        <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer"}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="#fff" gutterBottom style={{fontFamily: 'Maven Pro',fontStyle: "normal",fontWeight:"500",fontSize:"36px",lineHeight:"28px",marginTop:"20px"}}>
                                    Profile
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    </div>
  );
};