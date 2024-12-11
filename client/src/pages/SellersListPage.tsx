import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Seller {
  _id: string;
  name: string;
  contactInfo: string;
  products: string[];
  userId: string;
}

const SellersListPage: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchSellers = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/sellers', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch sellers');
      }

      const response = await res.json();
      setSellers(response.data); // Assuming the API response structure has a `data` field
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading sellers...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sellers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.slice(5).map((seller) => (
          <div
            key={seller._id}
            className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{seller.name}</h2>
            <p className="text-gray-600 mb-4">
              <strong>Contact:</strong> {seller.contactInfo}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Products:</strong> {seller.products.length}
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => navigate(`/seller/${seller._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellersListPage;
