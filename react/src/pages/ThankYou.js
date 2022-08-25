import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { Services } from '../services/Services';
import regeneratorRuntime from "regenerator-runtime";
import Printer, { print } from "react-pdf-print";

export const ThankYou = () => {

    
    const { id } = useParams();
    const request = new Services;
    const [ticketNumber,setTicketNumber] = React.useState("");
    const [customerDetails,setCustomerDetails] = React.useState({});
    const [companyName,setCompanyName] = React.useState("");
    const [companyAddress,setCompanyAddress] = React.useState("B Road, Jodhpur, Rajasthan");
    const [companyContact,setCompanyContact] = React.useState("+919636200102");
    const [companyEmail,setCompanyEmail] = React.useState("sumersingh1997.ssh@gmail.com");
    const [bodyMessage,setBodyMessage] = React.useState("");
    const ids = ["1"];

    React.useEffect(()=>{

        setCompanyName(localStorage.getItem("company_name")?localStorage.getItem("company_name"):"Sagar Hotline Tours");

        request.GetAuthMethod("thankyou/"+id).then((m)=>{
            setCustomerDetails(m.data.data);
        });

        
        let num = String(id).padStart(7, '0');
        setTicketNumber(num);

    },[]);

    return (
        <div style={{maxWidth:"1200px",width:"100%",margin:"auto"}}>
            <h2 style={{textAlign:"center", margin:"30px"}}>Thank You</h2>
            <div style={{width:"100%"}}> 
                <button onClick={() => print(ids)} value="Stampa" style={{backgroundColor:" #007fff",border:" none",margin: "10px 0px",boxShadow: "1px 1px 20px rgb(0 0 0 / 15%)",borderRadius:" 10px",padding:"5px 36px",color:"#fff", margin:"10px 0px"}}>
                    <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48.2462" rx="10" fill="#007FFF"/>
                        <path d="M23.4993 28.125V13.625M23.4993 28.125L18.666 23.2917M23.4993 28.125L28.3327 23.2917M11.416 30.5417L12.1664 33.5444C12.2971 34.0672 12.5988 34.5313 13.0235 34.863C13.4482 35.1947 13.9717 35.3749 14.5106 35.375H32.4881C33.027 35.3749 33.5505 35.1947 33.9752 34.863C34.3999 34.5313 34.7016 34.0672 34.8323 33.5444L35.5827 30.5417" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Download Your Ticket
                </button>
            </div>
            <Printer>
                <div id={ids[0]} style={{ width:'200mm', height: '297mm', margin:"auto", padding:"50px"  }}>
                    <div style={{width:"100%"}}>
                        <div style={{textAlign:"right",fontSize: "50px",fontWeight:"600"}}>INVOICE</div>
                    </div>
                    <div style={{width:"100%",paddingTop:"20px"}}>
                        <h4>{companyName}</h4>
                        <h6>{companyAddress}</h6>
                        <h6>Contact : {companyContact}</h6>
                        <h6>Email : {companyEmail}</h6>
                    </div>
                    <div style={{width:"100%",paddingTop:"20px"}}>
                        <h4>{customerDetails.title_name +" "+ customerDetails.first_name +" "+ customerDetails.middle_name +" "+ customerDetails.last_name}</h4>
                        <h6>Contact : {customerDetails.phone}</h6>
                        <h6>Email : {customerDetails.email}</h6>
                    </div>
                    <div style={{width:"100%",paddingTop:"50px",display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                        <div style={{width:"50%"}}>
                            <b>Invoice Number </b>: MM{ticketNumber} 
                        </div>
                        <div style={{width:"50%",textAlign:"right"}}>
                            <b>Booking Date </b>: {customerDetails.date_time}
                        </div>
                    </div>
                    <div style={{width:"100%",paddingTop:"20px"}}>
                        <h4>Total amount : {customerDetails.amount}</h4>
                    </div>
                </div>
            </Printer>
        </div>
    );
};