import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';

import {
  Menu,
  Dashboard,
  Warning,
  Timeline,
  Public,
  Settings,
  AccountCircle,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DashboardLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Alerts', icon: <Warning />, path: '/alerts' },
    { text: 'Analytics', icon: <Timeline />, path: '/analytics' },
    { text: 'Threat Intel', icon: <Public />, path: '/threat-intel' },
    { text: 'System Status', icon: <Settings />, path: '/systemstatus' },
    { text: 'AI Recommendations', icon: <Timeline />, path: '/ai-recommendations' },
    { text: 'Profile Settings', icon: <Settings />, path: '/profile-settings' },
  ];
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, cursor: 'pointer', ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              fontFamily: '"Roboto Slab", serif',
              fontWeight: 700,
              letterSpacing: 1.5,
              color: 'inherit',
            }}
          >
            SOC SWIFT
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            onClick={() => navigate('/profile')}
            sx={{ cursor: 'pointer' }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBarStyled>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.default,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ cursor: 'pointer' }}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                cursor: 'pointer',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  fontWeight: 600,
                },
                '&.Mui-selected:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
