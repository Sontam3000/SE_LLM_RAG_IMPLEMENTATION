import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { login } from '../firebase/auth'; 
import Alert from '@mui/material/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password); 
      navigate('/admin-dashboard'); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingTop: '5em' }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: '2em', fontFamily: "Lato, sans-serif" }}
      >
        Login to Your Account
      </Typography>

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {error && (
                  <Alert severity="error" sx={{ marginBottom: '1em', width:"100%" }}>
                    {error? "Invalid Credentials":""}
                  </Alert>
                )}
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '1.5em' }}
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '0.8em' }}
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            marginTop: "1em",
            height: "3.5em",
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" data-testid="loading-spinner" />
          ) : (
            "Login"
          )}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            margin: "1em",
            height: "3.5em",
            borderColor: '#fff',
            color: '#fff', 
            '&:hover': {
              borderColor: '#ccc', 
              color: '#ccc',
            },
          }}
          onClick={() => navigate('/register')}
        >
          Don't have an account? Register
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
