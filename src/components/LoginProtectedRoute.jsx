import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const LoginProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return children;
}

export default LoginProtectedRoute;