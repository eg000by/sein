// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('access');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;