import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';


const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();  // Access authToken from context

  if (!authToken) {
    return <Navigate to="/" />;  // Redirect to home page if not logged in
  }

  return children;  // Render children if the user is logged in
};

export default PrivateRoute;
