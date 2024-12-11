import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  // If user is logged in (token exists), redirect to home
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
