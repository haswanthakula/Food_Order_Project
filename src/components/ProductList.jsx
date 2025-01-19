import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Helper function to get correct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "https://via.placeholder.com/400x300?text=No+Image";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `https://food-json.onrender.com/${imageUrl}`;
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://food-json.onrender.com/meals");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `https://food-json.onrender.com/meals/${productId}`,
          {
            method: "DELETE"
          }
        );

        if (!response.ok) throw new Error("Failed to delete product");
        toast.success("Product deleted successfully");
        fetchProducts(); // Refresh the list
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-management">
      <div className="product-header">
        <h3>Product Management</h3>
        <button 
          className="add-product-btn"
          onClick={() => setIsAddingProduct(true)}
        >
          Add New Product
        </button>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  e.target.onerror = null;
                }}
                loading="lazy"
              />
            </div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="price">₹{product.price}</p>
              <p className="description">{product.description}</p>
            </div>
            <div className="product-actions">
              <button 
                className="edit-btn"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals remain the same */}
    </div>
  );
};

export default ProductList;