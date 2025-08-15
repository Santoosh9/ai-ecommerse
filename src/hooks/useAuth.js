import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook for authentication operations
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Hook for checking if user is authenticated
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

// Hook for getting current user
export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};

// Hook for authentication loading state
export const useAuthLoading = () => {
  const { loading } = useAuth();
  return loading;
};

// Hook for authentication errors
export const useAuthError = () => {
  const { error } = useAuth();
  return error;
};

// Hook for opening auth modal
export const useAuthModal = () => {
  const { openAuthModal, closeAuthModal, showAuthModal } = useAuth();
  return { openAuthModal, closeAuthModal, showAuthModal };
};

export default useAuth;
