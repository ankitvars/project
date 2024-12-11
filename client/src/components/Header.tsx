// src/components/Header.tsx
import { Button } from '@headlessui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">
          <Link to="/">My Marketplace</Link>
        </h1>
        <nav className="flex space-x-4">
          <Link to="/sellers" className="hover:text-gray-200 transition-colors">
            Sellers
          </Link>
          <Button
            onClick={() => {
              localStorage.clear();
              navigate('/login');
              window.location.reload();
            }}
            className="hover:text-gray-200 transition-colors cursor-pointer"
          >
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
