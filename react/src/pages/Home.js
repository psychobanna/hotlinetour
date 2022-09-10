import styled from '@emotion/styled';
import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services/Services';

function Home(props) {
    
    const [compnayName,setCompnayName] = useState("");
    
    useEffect(()=>{
        const request = new Services;
        request.GetCheckToken();
        request.GetAuthMethod("viewpaymentkeyvalue").then((m)=>{
            let company = m.data.data[0];
            localStorage.setItem("company_name",company.company_name);
            setCompnayName(company.company_name);
        });


    });
  
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const logOut = () => {
        localStorage.clear();
        // navigator("/login");
        window.location.href = "/login"
    } 
    
    const navigator = useNavigate();
    return (
        <div>
            <Container style={{margin:"50px auto"}}>
                <h2 style={{fontSize:"50px", textAlign:"center", margin:"20px 0px 20px 0px"}}>{compnayName}</h2>
                <h4 style={{fontSize:"36px", textAlign:"center", margin:"20px 0px 20px 0px"}}>Dashboard</h4>
                <Grid container spacing={2}>
                    <Grid item md={3} xs={6}>
                        <Link to={"/ticketsettings"}>
                            <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer"}}>
                                <CardContent>
                                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_23_415)">
                                            <path d="M28.7852 11.8104L38.1685 21.1875L21.1893 38.1667L11.8122 28.7833L28.7852 11.8104ZM22.5227 40.8604L40.856 22.5271C41.034 22.3537 41.1756 22.1465 41.2723 21.9176C41.369 21.6886 41.4189 21.4427 41.4191 21.1942C41.4193 20.9457 41.3698 20.6997 41.2734 20.4706C41.1771 20.2415 41.0358 20.0341 40.8581 19.8604L30.1164 9.11875C29.7571 8.77571 29.2794 8.58448 28.7827 8.58486C28.2859 8.58525 27.8085 8.77723 27.4497 9.12083L9.11641 27.4542C8.93837 27.6275 8.79683 27.8348 8.70012 28.0637C8.60341 28.2926 8.55349 28.5386 8.5533 28.7871C8.5531 29.0356 8.60264 29.2816 8.69899 29.5107C8.79534 29.7397 8.93656 29.9472 9.11432 30.1208L19.856 40.8625C20.2153 41.2055 20.693 41.3968 21.1897 41.3964C21.6865 41.396 22.1639 41.204 22.5227 40.8604ZM48.9039 21.9583L21.9914 48.9021C21.2997 49.5812 20.3518 50 19.306 50C18.2602 50 17.3122 49.5812 16.6206 48.9021L12.8831 45.1667C13.9267 44.0907 14.5052 42.6474 14.4936 41.1484C14.4821 39.6495 13.8814 38.2153 12.8213 37.1555C11.7613 36.0957 10.3269 35.4954 8.82797 35.4843C7.32905 35.4731 5.88589 36.052 4.81016 37.0958L4.81224 37.0938L1.10182 33.3562C0.422656 32.6646 0.00390625 31.7167 0.00390625 30.6708C0.00390625 29.625 0.422656 28.6771 1.10182 27.9854L28.0164 1.09792C28.7081 0.41875 29.656 0 30.7018 0C31.7477 0 32.6956 0.41875 33.3872 1.09792L37.0977 4.80833C36.5483 5.3339 36.1095 5.9639 35.807 6.66135C35.5045 7.35881 35.3443 8.10966 35.3359 8.86986C35.3275 9.63005 35.4711 10.3843 35.7581 11.0882C36.0452 11.7922 36.47 12.4317 37.0075 12.9693C37.5451 13.5069 38.1846 13.9316 38.8886 14.2187C39.5926 14.5057 40.3468 14.6493 41.107 14.6409C41.8672 14.6325 42.618 14.4723 43.3155 14.1698C44.0129 13.8673 44.6429 13.4285 45.1685 12.8792L45.1706 12.8771L48.9081 16.5875C49.5872 17.2792 50.006 18.2271 50.006 19.2729C50.006 20.3188 49.5872 21.2667 48.9081 21.9583H48.9039Z" fill="white"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_23_415">
                                            <rect width="50" height="50" fill="white"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    <Typography sx={{ fontSize: 14 }} color="#fff" gutterBottom style={{fontFamily: 'Maven Pro',fontStyle: "normal",fontWeight:"500",fontSize:"36px",lineHeight:"28px",marginTop:"20px"}}>
                                        500
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <Link to={"/agent"}>
                            <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer"}}>
                                <CardContent>
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M43.7503 25.4583C43.7503 14.0208 34.8753 6.25 25.0003 6.25C15.2295 6.25 6.25033 13.8542 6.25033 25.5833C5.00033 26.2917 4.16699 27.625 4.16699 29.1667V33.3333C4.16699 35.625 6.04199 37.5 8.33366 37.5H10.417V24.7917C10.417 16.7292 16.9378 10.2083 25.0003 10.2083C33.0628 10.2083 39.5837 16.7292 39.5837 24.7917V39.5833H22.917V43.75H39.5837C41.8753 43.75 43.7503 41.875 43.7503 39.5833V37.0417C44.9795 36.3958 45.8337 35.125 45.8337 33.625V28.8333C45.8337 27.375 44.9795 26.1042 43.7503 25.4583Z" fill="white"/>
                                        <path d="M18.7503 29.1667C19.9009 29.1667 20.8337 28.2339 20.8337 27.0833C20.8337 25.9327 19.9009 25 18.7503 25C17.5997 25 16.667 25.9327 16.667 27.0833C16.667 28.2339 17.5997 29.1667 18.7503 29.1667Z" fill="white"/>
                                        <path d="M31.2503 29.1667C32.4009 29.1667 33.3337 28.2339 33.3337 27.0833C33.3337 25.9327 32.4009 25 31.2503 25C30.0997 25 29.167 25.9327 29.167 27.0833C29.167 28.2339 30.0997 29.1667 31.2503 29.1667Z" fill="white"/>
                                        <path d="M37.5005 22.9792C37.0037 20.0503 35.4867 17.3916 33.2181 15.4737C30.9494 13.5558 28.0753 12.5024 25.1046 12.5C18.7921 12.5 12.0005 17.7292 12.5421 25.9375C15.1112 24.8862 17.3801 23.2156 19.1468 21.0745C20.9134 18.9335 22.1228 16.3886 22.6671 13.6667C25.3963 19.1458 31.0005 22.9167 37.5005 22.9792Z" fill="white"/>
                                    </svg>
                                    <Typography sx={{ fontSize: 14 }} color="#fff" gutterBottom style={{fontFamily: 'Maven Pro',fontStyle: "normal",fontWeight:"500",fontSize:"36px",lineHeight:"28px",marginTop:"20px"}}>
                                        500
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <Link to={"/booking"}>
                            <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer"}}>
                                <CardContent>
                                    <svg width="42" height="50" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 11.8421C10.5 18.3711 15.211 23.6842 21 23.6842C26.789 23.6842 31.5 18.3711 31.5 11.8421C31.5 5.31316 26.789 0 21 0C15.211 0 10.5 5.31316 10.5 11.8421ZM39.6667 50H42V47.3684C42 37.2132 34.671 28.9474 25.6667 28.9474H16.3333C7.32667 28.9474 0 37.2132 0 47.3684V50H39.6667Z" fill="white"/>
                                    </svg>
                                    <Typography sx={{ fontSize: 14 }} color="#fff" gutterBottom style={{fontFamily: 'Maven Pro',fontStyle: "normal",fontWeight:"500",fontSize:"36px",lineHeight:"28px",marginTop:"20px"}}>
                                        500
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <Card xs={12} style={{backgroundColor:"#007FFF",textAlign:"center",cursor:"pointer",padding:"32px 0px"}} onClick={()=>{logOut()}}>
                            <CardContent>
                                <svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42.972 35.5233H39.1287C38.8663 35.5233 38.6203 35.638 38.4562 35.8403C38.0736 36.3048 37.6635 36.7529 37.2316 37.1792C35.4652 38.9468 33.3729 40.3554 31.0703 41.3272C28.6848 42.3344 26.1208 42.8511 23.5313 42.8465C20.9126 42.8465 18.3759 42.3328 15.9923 41.3272C13.6897 40.3554 11.5974 38.9468 9.83092 37.1792C8.06133 35.4176 6.6503 33.3296 5.67599 31.031C4.66459 28.6482 4.15615 26.1178 4.15615 23.5C4.15615 20.8823 4.67005 18.3519 5.67599 15.9691C6.64912 13.6683 8.04867 11.597 9.83092 9.82088C11.6132 8.04472 13.6852 6.64565 15.9923 5.67286C18.3759 4.66728 20.9126 4.15356 23.5313 4.15356C26.15 4.15356 28.6867 4.66182 31.0703 5.67286C33.3774 6.64565 35.4494 8.04472 37.2316 9.82088C37.6635 10.2526 38.0681 10.7008 38.4562 11.1598C38.6203 11.362 38.8717 11.4768 39.1287 11.4768H42.972C43.3164 11.4768 43.5296 11.0942 43.3383 10.8046C39.1451 4.29019 31.8084 -0.0217777 23.4711 8.27344e-05C10.3722 0.0328734 -0.129992 10.6625 0.00121616 23.7405C0.132425 36.6108 10.6182 47 23.5313 47C31.8466 47 39.1506 42.6935 43.3383 36.1955C43.5242 35.9058 43.3164 35.5233 42.972 35.5233ZM47.8322 23.1557L40.0745 17.0348C39.7847 16.8053 39.3638 17.013 39.3638 17.3791V21.5326H22.1973C21.9568 21.5326 21.76 21.7293 21.76 21.9698V25.0303C21.76 25.2707 21.9568 25.4675 22.1973 25.4675H39.3638V29.621C39.3638 29.9871 39.7902 30.1948 40.0745 29.9653L47.8322 23.8443C47.8845 23.8034 47.9267 23.7512 47.9558 23.6915C47.9849 23.6319 48 23.5664 48 23.5C48 23.4337 47.9849 23.3682 47.9558 23.3085C47.9267 23.2489 47.8845 23.1966 47.8322 23.1557Z" fill="white"/>
                                </svg>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Home;