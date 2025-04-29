import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress,
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import { 
  CheckCircle, 
  Error, 
  Warning, 
  Storage, 
  CloudUpload,
  Schedule,
  AccessTime,
  Speed
} from '@mui/icons-material';

const SystemStatus = () => {
  const theme = useTheme();
  
  // Mock data
  const components = [
    { name: 'MongoDB', status: 'operational', lastChecked: '2 minutes ago' },
    { name: 'API Server', status: 'operational', lastChecked: '1 minute ago' },
    { name: 'Log Ingestion', status: 'degraded', lastChecked: 'Just now' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle color="success" />;
      case 'degraded': return <Warning color="warning" />;
      default: return <Error color="error" />;
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'operational': return (
        <Chip 
          label="Operational" 
          size="small" 
          color="success" 
          variant="outlined"
          sx={{ 
            borderWidth: '2px',
            fontWeight: 500 
          }}
        />
      );
      case 'degraded': return (
        <Chip 
          label="Degraded" 
          size="small" 
          color="warning" 
          variant="outlined"
          sx={{ 
            borderWidth: '2px',
            fontWeight: 500 
          }}
        />
      );
      default: return (
        <Chip 
          label="Down" 
          size="small" 
          color="error" 
          variant="outlined"
          sx={{ 
            borderWidth: '2px',
            fontWeight: 500 
          }}
        />
      );
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        height: '100%',
        borderRadius: 3,
        background: theme.palette.background.paper
      }}
    >
      <Typography 
        variant="h6" 
        mb={3}
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Speed fontSize="small" />
        System Status
      </Typography>
      
      <Box mb={4}>
        <Typography 
          variant="subtitle1" 
          mb={2}
          sx={{
            fontWeight: 500,
            color: theme.palette.text.secondary,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          Component Status
        </Typography>
        <List dense sx={{ py: 0 }}>
          {components.map((component, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ py: 1.5, px: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {component.name === 'MongoDB' ? 
                    <Storage color="primary" /> : 
                   component.name === 'API Server' ? 
                    <CloudUpload color="primary" /> : 
                    <Schedule color="primary" />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight={500}>
                      {component.name}
                    </Typography>
                  }
                  secondary={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AccessTime fontSize="inherit" sx={{ fontSize: '0.8rem' }} />
                      <Typography variant="caption">
                        Last checked: {component.lastChecked}
                      </Typography>
                    </Stack>
                  }
                  sx={{ my: 0 }}
                />
                <Box sx={{ ml: 2 }}>
                  {getStatusChip(component.status)}
                </Box>
              </ListItem>
              {index < components.length - 1 && (
                <Divider 
                  sx={{ 
                    my: 0.5,
                    opacity: 0.5
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box>
        <Typography 
          variant="subtitle1" 
          mb={2}
          sx={{
            fontWeight: 500,
            color: theme.palette.text.secondary,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          Log Ingestion Activity
        </Typography>
        <Box display="flex" alignItems="center" mb={1.5}>
          <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
            <AccessTime fontSize="small" />
            <Typography variant="body2">
              Last log received: <strong>12 seconds ago</strong>
            </Typography>
          </Stack>
          <Chip 
            label="Active" 
            size="small" 
            color="success" 
            sx={{ fontWeight: 500 }}
          />
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={75} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            mb: 1.5,
            backgroundColor: theme.palette.grey[300],
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              backgroundColor: theme.palette.success.main
            }
          }} 
        />
        <Typography 
          variant="caption" 
          display="block" 
          sx={{ 
            fontStyle: 'italic',
            color: theme.palette.text.secondary
          }}
        >
          Throughput: ~<strong>120 logs/minute</strong>
        </Typography>
      </Box>
    </Paper>
  );
};

export default SystemStatus;