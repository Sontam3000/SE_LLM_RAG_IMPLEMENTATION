import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

const SideNavPanel = () => {
  return (
    <Box
      sx={{
        width: '250px',
        height: '100vh',
        backgroundColor: 'background.paper',
        padding: '1.5rem',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        InfoBot Students
      </Typography>

      <Divider sx={{ marginBottom: '1rem' }} />

      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* <ListItem button>
          <ListItemText primary="Chat History" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem> */}
      </List>

      <Box sx={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.8rem', color: 'text.secondary' }}>
        &copy; 2025 InfoBot Admin
      </Box>
    </Box>
  );
};

export default SideNavPanel;
