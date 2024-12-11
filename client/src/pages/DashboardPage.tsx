// src/pages/DashboardPage.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Dashboard
        </h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 px-3 rounded transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `block py-2 px-3 rounded transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/sellers"
            className={({ isActive }) =>
              `block py-2 px-3 rounded transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Sellers
          </NavLink>
        </nav>
        <div className="mt-auto">
          {/* You could add a logout button or user info here */}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-auto">
        {/* If using nested routes, Outlet will render the current page here */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;
