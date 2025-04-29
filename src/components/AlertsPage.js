import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField,
  MenuItem,
  Button,
  Chip,
  Stack,
  useTheme,
  IconButton,
  Tooltip,
  Badge,
  Divider
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { 
  Search, 
  FilterAlt, 
  Clear, 
  Refresh, 
  Archive, 
  CheckCircle,
  Warning,
  Error,
  NotificationsActive,
  MoreVert,
  Download
} from '@mui/icons-material';

const AlertsPage = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    severity: 'all',
    status: 'all',
    search: ''
  });

  // Mock data
  const alerts = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      source_ip: '192.168.1.1',
      severity: 8,
      event_type: 'Failed Login',
      status: 'Open',
      destination: '192.168.1.100',
      protocol: 'SSH'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      source_ip: '10.0.0.5',
      severity: 5,
      event_type: 'Port Scan',
      status: 'Open',
      destination: '10.0.0.1-254',
      protocol: 'TCP'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      source_ip: '172.16.0.3',
      severity: 3,
      event_type: 'Suspicious Activity',
      status: 'Resolved',
      destination: '172.16.0.10',
      protocol: 'HTTP'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      source_ip: '203.0.113.42',
      severity: 9,
      event_type: 'Brute Force Attempt',
      status: 'Open',
      destination: '192.168.1.15',
      protocol: 'RDP'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 7,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 7,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 10,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 1,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 9,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 2,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 10,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 6,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 11,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 9,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 12,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 7,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    },
    {
      id: 13,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      source_ip: '198.51.100.17',
      severity: 3,
      event_type: 'Malware Detected',
      status: 'Open',
      destination: '192.168.1.200',
      protocol: 'HTTP'
    }
  ];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredAlerts = alerts.filter(alert => {
    return (
      (filters.severity === 'all' || 
        (filters.severity === 'high' && alert.severity >= 7) ||
        (filters.severity === 'medium' && alert.severity >= 4 && alert.severity < 7) ||
        (filters.severity === 'low' && alert.severity < 4)) &&
      (filters.status === 'all' || 
        alert.status.toLowerCase() === filters.status) &&
      (filters.search === '' || 
        alert.source_ip.includes(filters.search) ||
        alert.event_type.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const columns = [
    { 
      field: 'timestamp', 
      headerName: 'Timestamp', 
      width: 100,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
      renderCell: (params) => (
        <Tooltip title={new Date(params.value).toLocaleString()}>
          <span>{new Date(params.value).toLocaleTimeString()}</span>
        </Tooltip>
      )
    },
    { 
      field: 'source_ip', 
      headerName: 'Source IP', 
      width: 100,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          variant="outlined"
          color="primary"
        />
      )
    },
    { 
      field: 'destination', 
      headerName: 'Destination', 
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'protocol', 
      headerName: 'Protocol', 
      width: 100,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          sx={{
            backgroundColor: theme.palette.grey[200],
            fontWeight: 500
          }}
        />
      )
    },
    { 
      field: 'severity', 
      headerName: 'Severity', 
      width: 100,
      renderCell: (params) => {
        let icon;
        if (params.value >= 7) icon = <Error fontSize="small" />;
        else if (params.value >= 4) icon = <Warning fontSize="small" />;
        else icon = <CheckCircle fontSize="small" />;
        
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            {icon}
            <Chip 
              label={`Level ${params.value}`} 
              color={
                params.value >= 7 ? 'error' : 
                params.value >= 4 ? 'warning' : 'success'
              }
              size="small"
              sx={{ fontWeight: 500 }}
            />
          </Stack>
        )
      }
    },
    { 
      field: 'event_type', 
      headerName: 'Event Type', 
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Open' ? 'primary' : 'default'}
          variant={params.value === 'Open' ? 'filled' : 'outlined'}
          size="small"
          sx={{ 
            fontWeight: 500,
            minWidth: 80,
            justifyContent: 'center'
          }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: () => (
        <IconButton size="small">
          <MoreVert fontSize="small" />
        </IconButton>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          <NotificationsActive sx={{ verticalAlign: 'middle', mr: 2, color: theme.palette.primary.main }} />
          Alerts Management
        </Typography>
        <Badge 
          badgeContent={alerts.filter(a => a.status === 'Open').length} 
          color="error" 
          overlap="circular"
          sx={{ 
            '& .MuiBadge-badge': {
              right: -10,
              top: 10,
              border: `2px solid ${theme.palette.background.paper}`
            }
          }}
        >
          <Button variant="contained" startIcon={<Refresh />}>
            Refresh Alerts
          </Button>
        </Badge>
      </Stack>
      
      <Paper elevation={3} sx={{ 
        p: 3, 
        mt: 2,
        borderRadius: 3,
        borderLeft: `4px solid ${theme.palette.primary.main}`
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={500}>
            Alert Overview
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<CheckCircle />}
              size="small"
            >
              Resolve Selected
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              startIcon={<Archive />}
              size="small"
            >
              Archive
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Download />}
              size="small"
            >
              Export
            </Button>
          </Stack>
        </Stack>

        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          mb={3}
          sx={{
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              '& > *': { width: '100%' }
            }
          }}
        >
          <TextField
            select
            size="small"
            label="Severity"
            name="severity"
            value={filters.severity}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Severities</MenuItem>
            <MenuItem value="high">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Error color="error" fontSize="small" />
                <span>High (7-10)</span>
              </Stack>
            </MenuItem>
            <MenuItem value="medium">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Warning color="warning" fontSize="small" />
                <span>Medium (4-6)</span>
              </Stack>
            </MenuItem>
            <MenuItem value="low">
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircle color="success" fontSize="small" />
                <span>Low (1-3)</span>
              </Stack>
            </MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </TextField>
          <TextField
            size="small"
            label="Search alerts..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
            }}
            sx={{ flexGrow: 1 }}
          />
          <Button 
            variant="outlined" 
            startIcon={<FilterAlt />}
            size="small"
            sx={{ minWidth: 100 }}
          >
            Filter
          </Button>
          <Button 
            variant="text" 
            startIcon={<Clear />}
            size="small"
            onClick={() => setFilters({
              severity: 'all',
              status: 'all',
              search: ''
            })}
          >
            Clear
          </Button>
        </Stack>
        
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredAlerts}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.grey[100],
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: theme.palette.action.hover,
              }
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AlertsPage;