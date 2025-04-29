import React from 'react';
import { Box, Typography, Paper, Divider, Chip, Button } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';

const AlertDetail = ({ alert, onClose }) => {
  if (!alert) return null;

  const getSeverityIcon = (severity) => {
    if (severity >= 7) return <Error color="error" fontSize="large" />;
    if (severity >= 4) return <Warning color="warning" fontSize="large" />;
    return <Info color="info" fontSize="large" />;
  };

  return (
    <Paper elevation={3} className="alert-detail">
      <Box className="alert-header">
        <Box className="alert-info">
          {getSeverityIcon(alert.severity)}
          <Typography variant="h5" component="div">
            {alert.rule_name || 'Security Alert'}
          </Typography>
          <Chip 
            label={`Severity: ${alert.severity}`} 
            color={alert.severity >= 7 ? 'error' : alert.severity >= 4 ? 'warning' : 'info'}
          />
        </Box>
        <Button onClick={onClose} variant="outlined">Close</Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box className="alert-description">
        <Typography variant="subtitle1">Details</Typography>
        <Typography variant="body2">
          {alert.description || 'No additional description available'}
        </Typography>
      </Box>

      <Box className="alert-meta">
        <Box>
          <Typography variant="subtitle2">Source IP</Typography>
          <Typography>{alert.source_ip || 'Unknown'}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Event Type</Typography>
          <Typography>{alert.event_type || 'Unknown'}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Timestamp</Typography>
          <Typography>
            {new Date(alert.timestamp).toLocaleString() || 'Unknown'}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="subtitle1">Actions</Typography>
        <Box className="alert-actions">
          <Button variant="contained" color="error">Block IP</Button>
          <Button variant="contained" color="warning">Mark as Suspicious</Button>
          <Button variant="outlined">Ignore</Button>
          <Button variant="outlined">False Positive</Button>
        </Box>
      </Box>
    </Paper>

  );
};

export default AlertDetail;