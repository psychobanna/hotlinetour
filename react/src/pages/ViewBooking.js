import * as React from 'react';
import { Alert, Container, Grid, IconButton, Link, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import DataTable from '../components/DataTable';
import { Services } from '../services/Services';
export function ViewBooking(props) {

  
  const [rows, setRows] = React.useState([]);
  const [alertType, setAlertType] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [agent, setAgent] = React.useState(true);
  const [customer, setCustomer] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  
  const { id } = useParams();

  React.useEffect(()=>{

      const request = new Services;

      function fetchData(){
          request.GetAuthMethod("viewbooking").then((m)=>{
              let resp = [];
              resp = m.data.data;
              setRows([...rows,...resp]);
              return ;
          });
      }
      fetchData();
  },[]);

  
        
  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
  };

  
  const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title_name', headerName: 'Title Name', width: 130 },
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'middle_name', headerName: 'Middle Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 130 },
        { field: 'payment_id', headerName: 'Payment ID', width: 200 },
        { field: 'agent_name', headerName: 'Agent Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'date_time', headerName: 'Date', width: 130 }
    ];

  return (<div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
            </Alert>
        </Snackbar>
        <Container style={{margin:"50px auto"}}>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <h4 style={{fontSize:"36px", textAlign:"left", margin:"20px 0px 50px 0px"}}>{"View Booking"}</h4>
                </Grid>
                <Grid item md={6} xs={4} style={{fontSize:"36px", textAlign:"right", margin:"20px 0px 50px 0px"}}>
                </Grid>  
                <Grid item md={12} xs={12}>
                  <DataTable rows={rows} columns={columns}/>
                </Grid>
            </Grid>
        </Container>
    </div>
  );
};