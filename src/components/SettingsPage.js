import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import { 
  AccountCircle, 
  Security, 
  Notifications,
  Logout,
  AdminPanelSettings,
  VerifiedUser,
  Email,
  Login
} from '@mui/icons-material';

const SettingsPage = () => {
  const theme = useTheme();
  const user = {
    name: 'John Doe',
    email: 'john.doe@socshield.com',
    role: 'Senior Security Analyst',
    lastLogin: '2025-04-29T14:30:00Z',
    permissions: ['View Alerts', 'Manage Rules', 'Export Reports']
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4,
        maxWidth: 600,
        margin: 'auto',
        background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, #f0f4ff)`,
        borderRadius: '12px'
      }}
    >
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        mb={3}
        textAlign="center"
      >
        <Avatar 
          sx={{ 
            width: 100, 
            height: 100, 
            mb: 2,
            bgcolor: theme.palette.primary.main,
            border: `3px solid ${theme.palette.secondary.main}`
          }}
        >
          <AccountCircle sx={{ fontSize: 60, color: theme.palette.common.white }} />
        </Avatar>
        <Typography variant="h5" fontWeight="600" gutterBottom>
          {user.name}
        </Typography>
        <Chip 
          label={user.role} 
          color="primary" 
          size="small" 
          sx={{ mb: 1, fontWeight: '500' }}
        />
        <Box display="flex" alignItems="center" color="text.secondary">
          <Email fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ 
        my: 3, 
        borderColor: 'divider',
        borderBottomWidth: 2,
        borderBottomStyle: 'dashed'
      }} />

      <List disablePadding>
        <ListItem sx={{
          bgcolor: 'action.hover',
          borderRadius: '8px',
          mb: 1,
          py: 1.5
        }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Security color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography fontWeight="500">Permissions</Typography>} 
            secondary={
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {user.permissions.map((perm, index) => (
                  <Chip 
                    key={index} 
                    label={perm} 
                    size="small" 
                    variant="outlined"
                    color="secondary"
                  />
                ))}
              </Box>
            } 
            secondaryTypographyProps={{ component: 'div' }}
          />
        </ListItem>
        
        <ListItem sx={{
          bgcolor: 'action.hover',
          borderRadius: '8px',
          mb: 1,
          py: 1.5
        }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Notifications color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography fontWeight="500">Last Login</Typography>} 
            secondary={
              <Box display="flex" alignItems="center">
                <Login fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                {new Date(user.lastLogin).toLocaleString()}
              </Box>
            } 
          />
        </ListItem>
        
        <ListItem sx={{
          bgcolor: 'action.hover',
          borderRadius: '8px',
          mb: 1,
          py: 1.5
        }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <VerifiedUser color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography fontWeight="500">Authentication</Typography>} 
            secondary={
              <Chip 
                label="Multi-factor enabled" 
                size="small" 
                color="success"
                variant="outlined"
                icon={<VerifiedUser fontSize="small" />}
              />
            }
            secondaryTypographyProps={{ component: 'div' }}
          />
        </ListItem>
        
        {user.role.includes('Admin') && (
          <ListItem sx={{
            bgcolor: 'action.hover',
            borderRadius: '8px',
            mb: 1,
            py: 1.5
          }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AdminPanelSettings color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography fontWeight="500">Admin Privileges</Typography>} 
              secondary={
                <Chip 
                  label="Full system access" 
                  size="small" 
                  color="warning"
                  variant="outlined"
                />
              }
              secondaryTypographyProps={{ component: 'div' }}
            />
          </ListItem>
        )}
      </List>

      <Divider sx={{ 
        my: 3, 
        borderColor: 'divider',
        borderBottomWidth: 2,
        borderBottomStyle: 'dashed'
      }} />

      <Box display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Logout />}
          sx={{ 
            mt: 1,
            px: 3,
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: '500',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              bgcolor: 'error.dark'
            }
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Paper>
  );
};

export default SettingsPage;