// src/pages/ProductsListPage.tsx
import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import AddProductDialog from '../components/AddProductDialog';

interface Product {
  _id: string;
  name: string;
  description: string;
  status: string;
}

const ProductsListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch products');
      const response: Product[] = await res.json();
      setProducts(response.data);
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
    fetchProducts();
  }, []);

  // Optionally re-fetch products whenever modal closes to refresh the list
  useEffect(() => {
    if (!isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>
      {products.length > 0 ? (
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.description}</td>
                <td className="border px-4 py-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10 text-gray-600">
          No products available.
        </p>
      )}

      {/* Use AddProductDialog */}
      <AddProductDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ProductsListPage;
