import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';

const RecentThreats = () => {
  // Mock data
  const threats = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      source_ip: '192.168.1.1',
      event_type: 'Failed Login',
      severity: 8
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      source_ip: '10.0.0.5',
      event_type: 'Port Scan',
      severity: 5
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      source_ip: '172.16.0.3',
      event_type: 'Suspicious Activity',
      severity: 3
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 900000).toISOString(),
      source_ip: '203.0.113.42',
      event_type: 'Brute Force Attempt',
      severity: 7
    }
  ];

  const getSeverityIcon = (severity) => {
    if (severity >= 7) return <Error color="error" />;
    if (severity >= 4) return <Warning color="warning" />;
    return <Info color="info" />;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" mb={2}>Recent Threats</Typography>
      
      <List sx={{ maxHeight: 400, overflow: 'auto' }}>
        {threats.map((threat) => (
          <React.Fragment key={threat.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  {getSeverityIcon(threat.severity)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={threat.event_type}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {threat.source_ip}
                    </Typography>
                    {` — ${new Date(threat.timestamp).toLocaleTimeString()}`}
                  </>
                }
              />
              <Chip 
                label={`Severity: ${threat.severity}`} 
                size="small"
                color={
                  threat.severity >= 7 ? 'error' : 
                  threat.severity >= 4 ? 'warning' : 'info'
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default RecentThreats;