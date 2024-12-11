import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Product {
  _id: string;
  name: string;
  description: string;
  status: string;
  imageUrl?: string; // Optional field for product image URL
}

interface Seller {
  _id: string;
  name: string;
  contactInfo: string;
  products: Product[];
}

const SellerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;

  // Function to fetch seller data
  const fetchSeller = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/seller/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch seller');
      }

      const response = await res.json();
      setSeller(response.data); // Access the `data` field from the API response
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

  // Fetch seller on mount and set up polling
  useEffect(() => {
    fetchSeller();
  }, [fetchSeller]);

  const isOwner = seller && userId === seller._id;

  // Function to update seller details
  const handleUpdate = async (name: string, contactInfo: string) => {
    if (!id) return;
    setUpdateMessage(null);

    try {
      const res = await fetch(`/api/sellers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ name, contactInfo }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update seller');
      }

      const updatedSeller: Seller = await res.json();
      setSeller(updatedSeller);
      setUpdateMessage('Seller profile updated successfully!');
      setIsEditMode(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUpdateMessage(err.message);
      } else {
        setUpdateMessage('An unknown error occurred.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-700">Loading seller...</p>
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

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-700">Seller not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full h-screen">
        <h1 className="text-3xl font-bold mb-6">{seller.name}</h1>
        {isOwner && !isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-6"
          >
            Edit Profile
          </button>
        )}
        {isEditMode ? (
          <div>
            <label className="block mb-2 font-semibold">Name:</label>
            <input
              type="text"
              defaultValue={seller.name}
              onBlur={(e) => handleUpdate(e.target.value, seller.contactInfo)}
              className="block w-full border border-gray-300 rounded px-4 py-2 mt-1 mb-4"
            />
            <label className="block mb-2 font-semibold">Contact Info:</label>
            <input
              type="text"
              defaultValue={seller.contactInfo}
              onBlur={(e) => handleUpdate(seller.name, e.target.value)}
              className="block w-full border border-gray-300 rounded px-4 py-2 mt-1"
            />
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">
              <strong>Contact Info:</strong> {seller.contactInfo}
            </p>
          </div>
        )}
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {seller.products.length > 0 ? (
          <ul className="space-y-4">
            {seller.products.map((product) => (
              <li key={product._id} className="border p-4 rounded shadow flex">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 rounded mr-4 object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">{product.status}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No products listed.</p>
        )}
        {updateMessage && (
          <p
            className={`mt-4 ${
              updateMessage.includes('successfully')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {updateMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
