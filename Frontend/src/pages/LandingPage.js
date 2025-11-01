import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  // Stack
} from '@mui/material';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ padding: '2rem' }}>
      <Typography 
        sx={{
          fontFamily: "Lato, sans-serif",
          fontWeight:"900",
          fontSize:"3em",
          marginBottom:"0.5em"
        }}
        variant="h4"
        align="center" 
      >
        InfoBot for College Students
      </Typography>

      <Grid container spacing={4} marginTop="5em" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card
            onClick={() => navigate('/user-dashboard')}
            sx={{
              cursor: 'pointer',
              padding: '1em',
              height: '450px',
              backgroundColor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',  
              alignItems: 'center',
              boxShadow: 4,
              borderRadius: 3,
              transition: 'transform 0.1s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Typography
                sx={{
                  marginTop:"1.2em",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "900",
                  fontSize: "2em",
                  marginBottom: "0.5em"
                }}
                variant="h5" 
              >
                Student Zone
              </Typography>
              <Typography 
                sx={{ 
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "700",
                }}
                variant="body2" 
                color="text.secondary"
              >
                Find academic resources, campus announcements, and tools to help you stay on track.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

       
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              cursor: 'pointer',
              padding: '1em',
              height: '450px',
              backgroundColor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',  
              alignItems: 'center',
              boxShadow: 4,
              borderRadius: 3,
              transition: 'transform 0.1s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Typography
                variant="h5"
                sx={{
                  marginTop:"1.2em",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "900",
                  fontSize: "2em",
                  marginBottom: "0.5em"
                }}
              >
                Professor Zone
              </Typography>
              <Typography 
                sx={{ 
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "700",
                }}
                variant="body2" 
                color="text.secondary" 
                gutterBottom
              >
                Access tools for managing classes, engaging students, and monitoring academic progress.
              </Typography>

              {/* <Stack spacing={2} direction="row" sx={{ marginTop: '2em' }}> */}
              <Button
                  variant="contained"
                  sx={{
                    margin: "4em 2em 1em",
                    height:"3.5em",
                    backgroundColor: '#000', 
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    margin: "1em 2em",
                    height:"3.5em",
                    borderColor: '#fff',
                    color: '#fff', 
                    '&:hover': {
                      borderColor: '#ccc', 
                      color: '#ccc',
                    },
                  }}
                  onClick={() => navigate('/register')}
                >
                  Register Account
              </Button>

              {/* </Stack> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
