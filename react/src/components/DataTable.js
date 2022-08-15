import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Button, LinearProgress } from '@mui/material';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function DataTable(props) {
  
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [loading,setLoading] = React.useState(true); 

  React.useEffect(()=>{
    setLoading(false);
  });
  

  return (
    <div style={{ height: "60vh", width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress
        }}
        checkboxSelection={checkboxSelection} 
        loading={loading}
        // checkboxSelection
      />
    </div>
  );
}


export default DataTable;