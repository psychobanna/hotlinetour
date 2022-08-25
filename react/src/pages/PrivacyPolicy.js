// @flow
import { Box, Button } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services/Services';
export function PrivacyPolicy() {

    const navigate = useNavigate();
    const [ pageContent, setPageContent ] = React.useState("");
    const [ pageTitle, setPageTitle ] = React.useState("");
    
    React.useEffect(()=>{
        
        const request = new Services;

        request.GetMethod("viewactivepage").then((m)=>{
            let page = m.data.data[0];
            setPageContent(page.content);
            setPageTitle(page.name);
        });
    });

    const goBack = () => {
      navigate("/");
    }

  return (
    <div style={{maxWidth:"1200px",margin:"auto"}}>
        <Box sx={{ minWidth: 120, paddingTop:"30px",paddingRight:"30px", textAlign:"right" }}>
            <Button variant="contained" onClick={goBack}>Back</Button>
        </Box>
        <h2 style={{fontSize:"50px", textAlign:"center", margin:"100px 0px 50px 0px"}}>{pageTitle}</h2>
        <div dangerouslySetInnerHTML={{__html: pageContent}}></div>
    </div>
  );
};