import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  status: string;
  imageUrl: string; // Added for product image
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/products', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok || result.status !== 200) {
        throw new Error(result.message || 'Failed to fetch products');
      }

      setProducts(result.data || []);
      // toast.success('Products fetched successfully!');
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        <p className="ml-4 text-gray-700 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center my-16">
        Marketplace Products
      </h1>
      {products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-20">
          {products.map((p) => {
            console.log(p);
            return (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                  <p className="text-gray-600 mb-2">{p.description}</p>
                  <p
                    className={`text-sm font-semibold mb-4 capitalize ${
                      p.status === 'available'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    Status: {p.status}
                  </p>
                </div>
                <Link to={`/product/${p._id}`}>
                  <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors w-full text-center">
                    View Details
                  </button>
                </Link>
              </div>
            );
          })}
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
