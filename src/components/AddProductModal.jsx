import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from './Button';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onProductAdded, editingProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        image: editingProduct.image
      });
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingProduct 
        ? `https://food-json.onrender.com/meals/${editingProduct.id}`
        : 'https://food-json.onrender.com/meals';

      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save product');
      
      toast.success(editingProduct ? 'Product updated!' : 'Product added!');
      onProductAdded();
      onClose();
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              value={formData.image || ''}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>
          <div className="modal-actions">
            <Button type="submit">
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
            <Button type="button" textOnly onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;