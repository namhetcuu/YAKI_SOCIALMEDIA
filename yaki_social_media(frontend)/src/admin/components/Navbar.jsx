import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  InputBase, 
  Avatar, 
  Typography, 
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider
} from '@mui/material';
import { 
  Search, 
  KeyboardArrowDown,
  Person,
  Settings,
  Logout
} from '@mui/icons-material';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          {/* Search Bar */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '8px',
            padding: '4px 12px',
            width: '300px'
          }}>
            <Search sx={{ color: 'rgba(0, 0, 0, 0.5)', mr: 1 }} />
            <InputBase
              placeholder="Search or type command..."
              sx={{ 
                width: '100%',
                '& input': {
                  padding: '6px 0',
                  fontSize: '0.875rem'
                }
              }}
            />
          </Box>

          {/* User Profile with Dropdown */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '8px'
              },
              padding: '4px 8px'
            }}
            onClick={handleClick}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                backgroundColor: 'primary.main',
                fontSize: '14px',
                mr: 1
              }}
            >
              M
            </Avatar>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 500,
                mr: 0.5,
                fontSize: '0.875rem'
              }}
            >
              Musharof
            </Typography>
            <KeyboardArrowDown 
              sx={{ 
                color: 'text.secondary',
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0)'
              }} 
            />
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;