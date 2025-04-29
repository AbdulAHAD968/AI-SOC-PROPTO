import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  Divider,
  Button,
  Stack,
  useTheme,
  Avatar,
  LinearProgress,
  Badge
} from '@mui/material';
import { 
  Public, 
  Security, 
  GppGood, 
  Block, 
  WarningAmber,
  OpenInNew,
  Visibility,
  Timeline,
  Dangerous
} from '@mui/icons-material';

const ThreatIntelPage = () => {
  const theme = useTheme();

  // Mock data
  const flaggedIPs = [
    { ip: '185.143.223.15', threat: 'Malware', confidence: 95, lastSeen: '2 hours ago', threatLevel: 'Critical' },
    { ip: '91.234.116.22', threat: 'Phishing', confidence: 87, lastSeen: '5 hours ago', threatLevel: 'High' },
    { ip: '203.0.113.42', threat: 'Brute Force', confidence: 92, lastSeen: '1 day ago', threatLevel: 'Critical' }
  ];

  const globalThreats = [
    { id: 1, description: 'New ransomware campaign targeting healthcare', source: 'CISA', date: 'Today', severity: 'High' },
    { id: 2, description: 'Zero-day vulnerability in Apache Log4j', source: 'NIST', date: '2 days ago', severity: 'Critical' },
    { id: 3, description: 'Phishing campaign mimicking Microsoft 365', source: 'FBI', date: '1 week ago', severity: 'Medium' }
  ];

  const getThreatLevelChip = (level) => {
    const config = {
      Critical: { color: 'error', icon: <Dangerous fontSize="small" /> },
      High: { color: 'warning', icon: <WarningAmber fontSize="small" /> },
      Medium: { color: 'info', icon: <Visibility fontSize="small" /> },
      Low: { color: 'success', icon: <GppGood fontSize="small" /> }
    };

    return (
      <Chip
        icon={config[level]?.icon || config.Medium.icon}
        label={level}
        size="small"
        color={config[level]?.color || 'default'}
        variant="filled"
        sx={{
          fontWeight: 600,
          '& .MuiChip-icon': {
            color: theme.palette[config[level]?.color]?.contrastText || 'inherit'
          }
        }}
      />
    );
  };

  const getConfidenceBar = (confidence) => {
    let color;
    if (confidence > 90) color = theme.palette.error.main;
    else if (confidence > 80) color = theme.palette.warning.main;
    else color = theme.palette.info.main;

    return (
      <Box sx={{ width: '100%', mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={confidence}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: theme.palette.grey[300],
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              backgroundColor: color
            }
          }}
        />
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {confidence}% confidence
        </Typography>
      </Box>
    );
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        height: '100%',
        borderRadius: 3,
        borderTop: `4px solid ${theme.palette.error.main}`,
        background: theme.palette.background.paper
      }}
    >
      <Typography 
        variant="h6" 
        mb={3}
        sx={{
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Timeline color="error" />
        Threat Intelligence Dashboard
      </Typography>
      
      <Box mb={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography 
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Security color="warning" />
            Recently Flagged IPs
          </Typography>
          <Badge 
            badgeContent={flaggedIPs.length} 
            color="error" 
            sx={{ 
              '& .MuiBadge-badge': {
                right: -10,
                top: 10,
                border: `2px solid ${theme.palette.background.paper}`
              }
            }}
          />
        </Stack>
        
        <List sx={{ py: 0 }}>
          {flaggedIPs.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  py: 2,
                  px: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: 1
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600}>
                      {item.ip}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                        <Typography variant="body2" color="text.primary">
                          {item.threat}
                        </Typography>
                        {getThreatLevelChip(item.threatLevel)}
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        Last seen: {item.lastSeen}
                      </Typography>
                      {getConfidenceBar(item.confidence)}
                    </Box>
                  }
                  sx={{ my: 0, mr: 2 }}
                />
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Block />}
                  color="error"
                  sx={{
                    minWidth: 100,
                    fontWeight: 500,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                      backgroundColor: theme.palette.error.dark
                    }
                  }}
                  onClick={() => console.log(`Block ${item.ip}`)}
                >
                  Block IP
                </Button>
              </ListItem>
              {index < flaggedIPs.length - 1 && (
                <Divider 
                  sx={{ 
                    my: 0,
                    opacity: 0.5
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </List>
        <Button 
          size="small" 
          endIcon={<OpenInNew />}
          sx={{ 
            mt: 1,
            fontWeight: 500
          }}
        >
          View All Flagged IPs
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography 
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Public color="info" />
            Global Threat Alerts
          </Typography>
          <Chip 
            label="Live Feed" 
            size="small" 
            color="info" 
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Stack>
        
        <List sx={{ py: 0 }}>
          {globalThreats.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem
                sx={{
                  py: 2,
                  px: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: 1
                  }
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.warning.main,
                    mr: 2,
                    width: 36,
                    height: 36
                  }}
                >
                  <WarningAmber />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600}>
                      {item.description}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                        <Typography variant="body2" color="text.primary">
                          Source: {item.source}
                        </Typography>
                        {getThreatLevelChip(item.severity)}
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        Published: {item.date}
                      </Typography>
                    </Box>
                  }
                  sx={{ my: 0, mr: 2 }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<OpenInNew />}
                  sx={{
                    fontWeight: 500,
                    textTransform: 'none'
                  }}
                >
                  Details
                </Button>
              </ListItem>
              {index < globalThreats.length - 1 && (
                <Divider 
                  sx={{ 
                    my: 0,
                    opacity: 0.5
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </List>
        <Button 
          size="small" 
          endIcon={<OpenInNew />}
          sx={{ 
            mt: 1,
            fontWeight: 500
          }}
        >
          View More Alerts
        </Button>
      </Box>
    </Paper>
  );
};

export default ThreatIntelPage;