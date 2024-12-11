// src/routes/index.tsx
import React from 'react';
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
import DashboardPage from '../pages/DashboardPage';
import ProductsListPage from '../pages/ProductsListPage';
import SellersListPage from '../pages/SellersListPage';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Public routes (user must NOT be logged in) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected routes (user must be logged in) */}
          <Route element={<ProtectedRoute />}>
            {/* Wrap protected routes in the Dashboard layout */}
            <Route element={<DashboardPage />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/seller/:id" element={<SellerPage />} />
              <Route path="/products" element={<ProductsListPage />} />
              <Route path="/sellers" element={<SellersListPage />} />
            </Route>
          </Route>

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;
