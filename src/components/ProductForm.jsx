import { useState, useContext } from 'react';
import { ProductContext } from '../store/ProductContext';
import './ProductForm.css';

const ProductForm = ({ editProduct = null, onClose }) => {
  const { addProduct, editProduct: updateProduct } = useContext(ProductContext);
  const [product, setProduct] = useState(
    editProduct || {
      name: '',
      price: '',
      description: '',
      image: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      updateProduct(product);
    } else {
      addProduct({
        ...product,
        id: 'm' + Date.now() // Simple ID generation
      });
    }
    onClose();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({...product, name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({...product, price: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={product.description}
          onChange={(e) => setProduct({...product, description: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          value={product.image}
          onChange={(e) => setProduct({...product, image: e.target.value})}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {editProduct ? 'Update Product' : 'Add Product'}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;