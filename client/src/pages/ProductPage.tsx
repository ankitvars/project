// src/pages/ProductPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UpdateStatusModal from '../components/UpdateStatusModal';

interface Product {
  _id: string;
  name: string;
  description: string;
  status: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  // Function to fetch product data
  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        } else if (res.status === 404) {
          throw new Error('Product not found.');
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch product.');
        }
      }

      const data: Product = await res.json();
      setProduct(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred.');
        toast.error('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  // Fetch product on mount and set up polling
  useEffect(() => {
    fetchProduct();

    const interval = setInterval(() => {
      fetchProduct();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [fetchProduct]);

  // Callback to handle successful status update
  const handleUpdateSuccess = (newStatus: string) => {
    if (product) {
      setProduct({ ...product, status: newStatus });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-700">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-700">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full h-screen">
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-semibold text-gray-700">Status:</span>{' '}
            <span
              className={`px-2 py-1 rounded ${
                product.status === 'Available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.status}
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Update Status
          </button>
        </div>

        {/* Additional Product Details (if any) can go here */}

        {/* Update Status Modal */}
        <UpdateStatusModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentStatus={product.status}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </div>
    </div>
  );
};

export default ProductPage;
