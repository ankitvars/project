// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  status: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000); // Optional polling
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-700">Loading products...</p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center mt-16">
        Marketplace Overview
      </h1>
      {products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                <p className="text-gray-600 mb-2">{p.description}</p>
                <p className="text-sm text-gray-500 mb-4">Status: {p.status}</p>
              </div>
              <Link to={`/product/${p._id}`}>
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors w-full text-center">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No products available.
        </p>
      )}
    </div>
  );
};

export default HomePage;
