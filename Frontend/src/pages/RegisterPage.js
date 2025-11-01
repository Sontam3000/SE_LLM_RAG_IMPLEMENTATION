import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { register } from '../firebase/auth';
import Alert from '@mui/material/Alert';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register(email, password);
      alert(`Registered successfully with email: ${email}`);
      navigate('/login');
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingTop: '5em' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '2em', fontFamily: "Lato, sans-serif" }}>
        Create Your Account
      </Typography>
      <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', borderRadius: '8px', boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
      {error && <Alert severity="error" sx={{ marginBottom: '1em', width: '100%' }}>{error}</Alert>}
        
        <TextField label="Email" variant="outlined" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginBottom: '1.5em' }} required />
        <TextField label="Password" variant="outlined" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginBottom: '1.5em' }} required />
        <TextField label="Confirm Password" variant="outlined" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ marginBottom: '1em' }} required />

        <Button variant="contained" type="submit" fullWidth sx={{ marginTop: '1em', height: '3.5em', backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>

        <Button variant="outlined" fullWidth sx={{ margin: '1em', height: '3.5em', borderColor: '#fff', color: '#fff', '&:hover': { borderColor: '#ccc', color: '#ccc' } }} onClick={() => navigate('/login')}>
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
