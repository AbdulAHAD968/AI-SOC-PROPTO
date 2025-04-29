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
  Button,
  Chip,
  Stack,
  useTheme,
  LinearProgress
} from '@mui/material';
import { 
  AutoFixHigh, 
  Security, 
  Block,
  DeviceHub,
  Psychology,
  Bolt,
  Shield,
  Visibility,
  ArrowForward
} from '@mui/icons-material';

const AIRecommendations = () => {
  const theme = useTheme();
  
  // Mock data
  const recommendations = [
    {
      id: 1,
      alert: 'Multiple failed logins from 192.168.1.1',
      action: 'Block source IP temporarily',
      confidence: 92,
      priority: 'High',
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      alert: 'Port scanning detected from 10.0.0.5',
      action: 'Investigate source and monitor',
      confidence: 85,
      priority: 'Medium',
      timestamp: '5 minutes ago'
    },
    {
      id: 3,
      alert: 'Unusual outbound traffic from 172.16.0.3',
      action: 'Check for data exfiltration',
      confidence: 78,
      priority: 'Medium',
      timestamp: '10 minutes ago'
    }
  ];

  const getPriorityChip = (priority) => {
    const styles = {
      High: {
        color: theme.palette.error.dark,
        bgcolor: theme.palette.error.light,
        icon: <Bolt fontSize="small" />
      },
      Medium: {
        color: theme.palette.warning.dark,
        bgcolor: theme.palette.warning.light,
        icon: <Shield fontSize="small" />
      },
      Low: {
        color: theme.palette.info.dark,
        bgcolor: theme.palette.info.light,
        icon: <Visibility fontSize="small" />
      }
    };

    const style = styles[priority] || styles.Low;

    return (
      <Chip
        icon={style.icon}
        label={priority}
        size="small"
        sx={{
          color: style.color,
          backgroundColor: style.bgcolor,
          fontWeight: 600,
          px: 0.5,
          '& .MuiChip-icon': {
            color: style.color,
            ml: '4px'
          }
        }}
      />
    );
  };

  const getActionIcon = (action) => {
    if (action.includes('Block')) return <Block color="error" />;
    if (action.includes('Investigate')) return <Security color="warning" />;
    return <DeviceHub color="info" />;
  };

  const getConfidenceBar = (confidence) => {
    let color;
    if (confidence > 85) color = theme.palette.success.main;
    else if (confidence > 70) color = theme.palette.warning.main;
    else color = theme.palette.error.main;

    return (
      <Box sx={{ width: '100%', mt: 0.5 }}>
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
        borderRadius: 3,
        background: theme.palette.background.paper,
        borderLeft: `4px solid ${theme.palette.primary.main}`
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Psychology sx={{ color: theme.palette.primary.main }} />
          AI Security Recommendations
        </Typography>
        <Chip 
          icon={<AutoFixHigh fontSize="small" />} 
          label="AI-Powered Analysis" 
          color="primary" 
          variant="outlined"
          sx={{
            fontWeight: 500,
            borderWidth: '2px',
            '& .MuiChip-icon': {
              color: theme.palette.primary.main
            }
          }}
        />
      </Box>

      <List sx={{ py: 0 }}>
        {recommendations.map((rec, index) => (
          <React.Fragment key={rec.id}>
            <ListItem 
              alignItems="flex-start"
              sx={{
                py: 2,
                px: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.primary.main,
                    width: 36,
                    height: 36
                  }}
                >
                  {getActionIcon(rec.action)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={600}
                    sx={{ mb: 0.5 }}
                  >
                    {rec.alert}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      display="block"
                      sx={{ mb: 0.5 }}
                    >
                      {rec.action}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        {rec.timestamp}
                      </Typography>
                    </Stack>
                    {getConfidenceBar(rec.confidence)}
                  </Box>
                }
                sx={{ my: 0, mr: 2 }}
              />
              <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="flex-end"
                sx={{ minWidth: 120 }}
              >
                {getPriorityChip(rec.priority)}
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                  onClick={() => console.log(`Executing: ${rec.action}`)}
                >
                  Take Action
                </Button>
              </Box>
            </ListItem>
            {index < recommendations.length - 1 && (
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
    </Paper>
  );
};

export default AIRecommendations;