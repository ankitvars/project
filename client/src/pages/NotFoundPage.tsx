import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-700 mb-4">
        The page you are looking for doesn’t exist.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
