// src/routes/index.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductPage from '../pages/ProductPage';
import SellerPage from '../pages/SellerPage';
import NotFoundPage from '../pages/NotFoundPage';

import ErrorBoundary from '../components/ErrorBoundary';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import SellersListPage from '../pages/SellersListPage';
import Header from '../components/Header';

const AppRoutes: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  // Check for token in localStorage whenever it changes
  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    };

    checkToken();

    // Add an event listener for `storage` changes to reflect updates across tabs
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {token && <Header />}
        <Routes>
          {/* Public routes (user must NOT be logged in) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected routes (user must be logged in) */}
          <Route element={<ProtectedRoute />}>
            {/* Wrap protected routes in the Dashboard layout */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/seller/:id" element={<SellerPage />} />
            <Route path="/sellers" element={<SellersListPage />} />
          </Route>

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;
