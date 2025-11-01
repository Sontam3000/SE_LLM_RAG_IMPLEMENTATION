import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './firebase/auth'; 

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); 

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return children;  
};

export default ProtectedRoute;
