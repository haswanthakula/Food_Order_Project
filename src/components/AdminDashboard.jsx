import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../store/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    imageUrl: ''
  });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://food-json.onrender.com/meals');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };

  // Handle add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    } else if (newProduct.imageUrl) {
      formData.append('imageUrl', newProduct.imageUrl);
    }

    try {
      const response = await fetch('https://food-json.onrender.com/meals', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add product');
      
      toast.success('Product added successfully');
      setShowAddModal(false);
      setNewProduct({ name: '', description: '', price: '', image: null, imageUrl: '' });
      fetchProducts();
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  // Handle edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', selectedProduct.name);
    formData.append('description', selectedProduct.description);
    formData.append('price', selectedProduct.price);
    
    // Prioritize file upload, then use image URL
    if (selectedProduct.newImage) {
      formData.append('image', selectedProduct.newImage);
    } else if (selectedProduct.imageUrl) {
      formData.append('imageUrl', selectedProduct.imageUrl);
    }

    try {
      const response = await fetch(`https://food-json.onrender.com/meals/${selectedProduct.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update product');
      
      toast.success('Product updated successfully');
      setShowEditModal(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`https://food-json.onrender.com/meals/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete product');
        
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    authCtx.logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    if (!authCtx.isAdmin) {
      navigate('/');
      return;
    }

    fetchProducts();
    setIsLoading(false);
  }, [authCtx.isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="products-section">
        <div className="section-header">
          <h3>Product Management</h3>
          <button onClick={() => setShowAddModal(true)} className="add-btn">
            Add New Product
          </button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img
                  src={product.image ? 
                    (product.image.startsWith('http') ? product.image : 
                    `https://food-json.onrender.com/${product.image}`) : 
                    "https://via.placeholder.com/150"}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="price">₹{Number(product.price).toFixed(2)}</p>
                <p className="description">{product.description}</p>
                <div className="product-actions">
                  <button 
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }} 
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image (File)</label>
                <input
                  type="file"
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})}
                />
              </div>
              <div className="form-group">
                <label>Image (URL)</label>
                <input
                  type="text"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Product</h3>
            <form onSubmit={handleEditProduct}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Image (optional)</label>
                <input
                  type="file"
                  onChange={(e) => setSelectedProduct({...selectedProduct, newImage: e.target.files[0]})}
                />
              </div>
              <div className="form-group">
                <label>Image URL (optional)</label>
                <input
                  type="text"
                  value={selectedProduct.imageUrl}
                  onChange={(e) => setSelectedProduct({...selectedProduct, imageUrl: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Update Product</button>
                <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;