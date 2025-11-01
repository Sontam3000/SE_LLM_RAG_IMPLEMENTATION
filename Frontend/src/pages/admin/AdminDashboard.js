import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import AdminNavPanel from './adminComponent/AdminNavPanel';


const AdminDashboard = () => {
  const [settings, setSettings] = useState({
    temperature: '',
    maxTokens: '',
    topP: '',
    frequencyPenalty: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const payloadRef = doc(db, 'payload', 'modelSettings');
        const payloadSnap = await getDoc(payloadRef);

        if (payloadSnap.exists()) {
          const data = payloadSnap.data();
          setSettings({
            temperature: data.temperature ?? '',
            maxTokens: data.maxTokens ?? '',
            topP: data.topP ?? '',
            frequencyPenalty: data.frequencyPenalty ?? '',
          });
        }
      } catch (error) {
        console.error('Error fetching model settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const validateSettings = () => {
    const temp = parseFloat(settings.temperature);
    const tokens = parseInt(settings.maxTokens);
    const topP = parseFloat(settings.topP);
    const freqPenalty = parseFloat(settings.frequencyPenalty);

    if (tokens < 1 || tokens > 4096) {
      setError('Max Tokens must be between 1 and 4096.');
      return false;
    }
    if (temp < 0 || temp > 2) {
      setError('Temperature must be between 0.0 and 2.0.');
      return false;
    }
    if (topP < 0 || topP > 1) {
      setError('Top P must be between 0.0 and 1.0.');
      return false;
    }
    if (freqPenalty < 0 || freqPenalty > 2) {
      setError('Frequency Penalty must be between 0.0 and 2.0.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateSettings()) {
      return;
    }

    try {
      const payloadRef = doc(db, 'payload', 'modelSettings');
      await setDoc(payloadRef, {
        temperature: parseFloat(settings.temperature),
        maxTokens: parseInt(settings.maxTokens),
        topP: parseFloat(settings.topP),
        frequencyPenalty: parseFloat(settings.frequencyPenalty),
        updatedAt: new Date()
      });
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating model settings:', error);
      alert('Failed to update model settings.');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AdminNavPanel />
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'background.default',
          color: 'text.primary',
          padding: '2rem',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
          Prompt Setting
        </Typography>

        <Paper
          sx={{
            padding: '2rem',
            borderRadius: '10px',
            backgroundColor: 'background.paper',
          }}
        >
          <Alert severity="info" size="small">Best tuning can be: Temperature = 0.7, Max Tokens = 250, Top P = 1, Frequency Penalty = 1 </Alert>
          <br></br>
          <TextField
            label="Temperature"
            name="temperature"
            type="number"
            value={settings.temperature}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            label="Max Tokens"
            name="maxTokens"
            type="number"
            value={settings.maxTokens}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            label="Top P"
            name="topP"
            type="number"
            value={settings.topP}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            label="Frequency Penalty"
            name="frequencyPenalty"
            type="number"
            value={settings.frequencyPenalty}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '2rem' }}
          />

          {error && (
            <Typography color="error" sx={{ marginBottom: '1rem' }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': { backgroundColor: '#333' },
            }}
            onClick={handleSubmit}
          >
            Update Model
          </Button>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Model settings updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
