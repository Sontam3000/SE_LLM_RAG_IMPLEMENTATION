import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Feedback from './pages/admin/Feedback';
import Context from './pages/admin/Context';
import StudentFeedback from 'pages/user/UserFeedback';

import { useAuth } from './firebase/auth';  // Import the auth logic

// Dark Theme Setup
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();  // Get the current user from the auth context
  
  if (!currentUser) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }
  
  return children;  // If authenticated, render the children
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/user-dashboard" 
          element={
              <UserDashboard />
          } 
        />

          {/* Protected Routes */}
          <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/context" 
          element={
            <ProtectedRoute>
              <Context />
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/admin/feedback" 
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route path="/user/feedback" element={<StudentFeedback />} />

        {/* Uncomment these if needed */}
        {/* <Route path="/admin/statistics" element={<Statistics />} />
        <Route path="/admin/chat" element={<AdminChat />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
