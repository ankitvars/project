// src/pages/SellersListPage.tsx
import React, { useEffect, useState } from 'react';

interface Seller {
  _id: string;
  name: string;
  contactInfo: string;
}

const SellersListPage: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/sellers');
      if (!res.ok) throw new Error('Failed to fetch sellers');
      const data: Seller[] = await res.json();
      setSellers(data);
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

  if (loading) return <p className="text-center mt-10">Loading sellers...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sellers</h1>
      {sellers.length > 0 ? (
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Contact Info</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((s) => (
              <tr key={s._id}>
                <td className="border px-4 py-2">{s.name}</td>
                <td className="border px-4 py-2">{s.contactInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10 text-gray-600">No sellers available.</p>
      )}
    </div>
  );
};

export default SellersListPage;
