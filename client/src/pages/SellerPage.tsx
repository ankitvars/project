// src/pages/SellerPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  status: string;
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
  const [name, setName] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user') || '{}').id;

  const fetchSeller = async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/sellers/${id}`);
      if (!res.ok) throw new Error('Failed to fetch seller');
      const data: Seller = await res.json();
      setSeller(data);
      setName(data.name);
      setContactInfo(data.contactInfo);
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
    fetchSeller();
    const interval = setInterval(fetchSeller, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isOwner = userId && seller && userId === seller._id;

  const handleUpdate = async () => {
    if (!id) return;
    if (!token) {
      setUpdateMessage('You must be logged in to update the seller profile.');
      return;
    }

    try {
      const res = await fetch(`/api/sellers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, contactInfo }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update seller');
      }

      const updatedSeller: Seller = await res.json();
      setSeller(updatedSeller);
      setUpdateMessage('Seller profile updated successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUpdateMessage(err.message);
      } else {
        setUpdateMessage('An unknown error occurred');
      }
    }
  };

  if (loading) return <p>Loading seller...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!seller) return <p>Seller not found</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Seller Profile</h1>
      {isOwner ? (
        <>
          <label>
            Name:{' '}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Contact Info:{' '}
            <input
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleUpdate}>Update Profile</button>
          {updateMessage && <p>{updateMessage}</p>}
        </>
      ) : (
        <>
          <p>Name: {seller.name}</p>
          <p>Contact Info: {seller.contactInfo}</p>
        </>
      )}

      <h2>Products</h2>
      {seller.products && seller.products.length > 0 ? (
        <ul>
          {seller.products.map((product) => (
            <li key={product._id}>
              {product.name} - {product.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products listed.</p>
      )}
    </div>
  );
};

export default SellerPage;
