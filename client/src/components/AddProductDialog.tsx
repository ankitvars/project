// src/components/AddProductDialog.tsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddProductResponse {
  _id: string;
  name: string;
  description: string;
  status: string;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState('Available');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          name: newName.trim(),
          description: newDesc.trim(),
          status: newStatus,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      const data: AddProductResponse = await res.json(); // Parse the JSON response correctly
      toast.success('Product added successfully!');

      // Reset fields
      setNewName('');
      setNewDesc('');
      setNewStatus('Available');

      navigate(`/product/${data._id}`);

      // Close dialog
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-20"
          aria-hidden="true"
        ></div>

        <Dialog.Panel className="inline-block bg-white rounded shadow-xl w-full max-w-md p-6 relative z-10">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Add New Product
          </Dialog.Title>
          <form onSubmit={handleAddProduct} className="space-y-4 text-left">
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={submitting}
              >
                {submitting ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddProductDialog;
