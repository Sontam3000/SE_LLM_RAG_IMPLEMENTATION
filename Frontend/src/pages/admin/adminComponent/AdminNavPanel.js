import React from 'react';
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../firebase/auth'; 

const AdminNavPanel = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); 
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navItems = [
    { label: 'Prompt Setting', path: '/admin-dashboard' },
    { label: 'Context', path: '/admin/context' },
    { label: 'Feedback', path: '/admin/feedback' },
    // { label: 'Statistics', path: '/admin/statistics' },
    // { label: 'Chat', path: '/admin/chat' },
    { label: 'Logout', action: handleLogout }, // Logout action
  ];

  return (
    <Box
      sx={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        paddingTop: '2rem',
        borderRight: '1px solid #444',
      }}
    >
      <Typography variant="h6" align="center" sx={{ marginBottom: '2rem' }}>
        Admin Panel
      </Typography>

      <List>
        {navItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => item.action ? item.action() : navigate(item.path)}
            sx={{
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default AdminNavPanel;
