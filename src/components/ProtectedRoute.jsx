import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AccessDeniedAlert from './AccessDeniedAlert';

const ProtectedRoute = ({ children, showAlert = true }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && showAlert) {
      setShowAccessDenied(true);
    }
  }, [isAuthenticated, showAlert]);

  if (!isAuthenticated) {
    return (
      <>
        <AccessDeniedAlert 
          isVisible={showAccessDenied} 
          onClose={() => setShowAccessDenied(false)}
          message="You need to login to access this page. Please login to continue."
        />
        <Navigate to="/" replace state={{ from: location, message: 'Please login to access this page' }} />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
