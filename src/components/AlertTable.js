import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import AlertDetail from './AlertDetail';
import { Box } from '@mui/material';
import './AlertTable.css';

const AlertTable = ({ filters }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alerts', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [filters]);

  const columns = [
    { field: 'timestamp', headerName: 'Timestamp', width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString() },
    { field: 'source_ip', headerName: 'Source IP', width: 150 },
    { field: 'event_type', headerName: 'Event Type', width: 150 },
    { field: 'rule_name', headerName: 'Rule', width: 200 },
    { 
      field: 'severity', 
      headerName: 'Severity', 
      width: 120,
      renderCell: (params) => (
        <span style={{
          color: params.value > 7 ? 'red' : params.value > 4 ? 'orange' : 'green',
          fontWeight: 'bold'
        }}>
          {params.value}
        </span>
      )
    },
    { field: 'description', headerName: 'Description', width: 300 },
  ];

  return (
    <Box sx={{ height: '80vh', width: '100%' }}>
      <h2>Security Alerts</h2>
      
      {selectedAlert && (
        <AlertDetail 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      )}

      <DataGrid
        rows={alerts}
        columns={columns}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        getRowId={(row) => row._id}
        onRowClick={(params) => setSelectedAlert(params.row)}
        sx={{
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      />
    </Box>
  );
};

export default AlertTable;