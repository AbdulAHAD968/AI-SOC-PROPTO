import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField,
  MenuItem,
  Button,
  Chip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, FilterAlt, Clear } from '@mui/icons-material';

const AlertOverview = () => {
  // Mock data
  const alerts = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      source_ip: '192.168.1.1',
      severity: 8,
      event_type: 'Failed Login',
      status: 'Open'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      source_ip: '10.0.0.5',
      severity: 5,
      event_type: 'Port Scan',
      status: 'Open'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      source_ip: '172.16.0.3',
      severity: 3,
      event_type: 'Suspicious Activity',
      status: 'Resolved'
    }
  ];

  const columns = [
    { 
      field: 'timestamp', 
      headerName: 'Timestamp', 
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString() 
    },
    { field: 'source_ip', headerName: 'Source IP', width: 130 },
    { 
      field: 'severity', 
      headerName: 'Severity', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={
            params.value >= 7 ? 'error' : 
            params.value >= 4 ? 'warning' : 'success'
          }
        />
      )
    },
    { field: 'event_type', headerName: 'Event Type', width: 180 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Open' ? 'primary' : 'default'}
        />
      )
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Alert Overview</Typography>
        <Box display="flex" gap={2}>
          <TextField
            select
            size="small"
            label="Severity"
            defaultValue="all"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Severities</MenuItem>
            <MenuItem value="high">High (7-10)</MenuItem>
            <MenuItem value="medium">Medium (4-6)</MenuItem>
            <MenuItem value="low">Low (1-3)</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Status"
            defaultValue="all"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </TextField>
          <TextField
            size="small"
            label="Search"
            InputProps={{
              startAdornment: <Search fontSize="small" />,
            }}
          />
          <Button variant="outlined" startIcon={<FilterAlt />}>
            Filter
          </Button>
          <Button variant="outlined" startIcon={<Clear />}>
            Clear
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={alerts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
        />
      </Box>
    </Paper>
  );
};

export default AlertOverview;