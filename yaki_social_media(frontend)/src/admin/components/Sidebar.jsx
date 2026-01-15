import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography,
  Checkbox,
  Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Person as ProfileIcon,
  Task as TaskIcon,
  Description as FormsIcon,
  TableChart as TablesIcon,
  Pages as PagesIcon,
  Chat as ChatIcon,
  Email as EmailIcon,
  Receipt as InvoiceIcon
} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Box sx={{ 
      width: 260,
      height: '100vh',
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0'
    }}>
      {/* Header */}
      <Typography variant="h6" sx={{
        fontWeight: 'bold',
        padding: '0 24px 16px',
        color: 'text.primary',
        fontSize: '1.25rem'
      }}>
        TailAdmin
      </Typography>

      {/* MENU Section */}
      <Typography variant="subtitle2" sx={{
        padding: '0 24px 8px',
        color: 'text.secondary',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        MENU
      </Typography>

      <List sx={{ padding: '0 12px' }}>
        {[
          { path: '/admin', icon: <DashboardIcon />, text: 'Dashboard', active: false },
          { path: '/calendar', icon: <CalendarIcon />, text: 'Calendar', active: false },
          { path: '/profile', icon: <ProfileIcon />, text: 'User Profile', active: false },
          { path: '/tasks', icon: <TaskIcon />, text: 'Task', active: false },
          { path: '/forms', icon: <FormsIcon />, text: 'Forms', active: false },
          { path: '/tables', icon: <TablesIcon />, text: 'Tables', active: false },
          { path: '/pages', icon: <PagesIcon />, text: 'Pages', active: false },
        ].map((item) => (
          <NavLink to={item.path} key={item.text} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <ListItem button sx={{
                borderRadius: '6px',
                margin: '4px 12px',
                padding: '8px 12px',
                backgroundColor: isActive || item.active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.05)'
                }
              }}>
                <ListItemIcon sx={{ minWidth: '36px', color: isActive || item.active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    color: isActive || item.active ? 'primary.main' : 'text.primary',
                    '& .MuiTypography-root': {
                      fontSize: '0.875rem',
                      fontWeight: isActive || item.active ? '500' : '400'
                    }
                  }} 
                />
              </ListItem>
            )}
          </NavLink>
        ))}
      </List>

      {/* SUPPORT Section */}
      <Typography variant="subtitle2" sx={{
        padding: '16px 24px 8px',
        color: 'text.secondary',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        SUPPORT
      </Typography>

      <List sx={{ padding: '0 12px' }}>
        {[
          { path: '/chat', icon: <ChatIcon />, text: 'Chat', active: false },
          { path: '/email', icon: <EmailIcon />, text: 'Email', active: false },
          { path: '/invoice', icon: <InvoiceIcon />, text: 'Invoice', active: false },
        ].map((item) => (
          <NavLink to={item.path} key={item.text} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <ListItem button sx={{
                borderRadius: '6px',
                margin: '4px 12px',
                padding: '8px 12px',
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.05)'
                }
              }}>
                
                <ListItemIcon sx={{ minWidth: '36px', color: isActive ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    color: isActive ? 'primary.main' : 'text.primary',
                    '& .MuiTypography-root': {
                      fontSize: '0.875rem',
                      fontWeight: isActive ? '500' : '400'
                    }
                  }} 
                />
              </ListItem>
            )}
          </NavLink>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;