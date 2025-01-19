import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartContext from "../store/CartContext";
import Button from "./Button";
import UserProgressContext from "../store/UserProgressContext";
import logoImg from "../assets/logo.jpg";
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  function handleLogout() {
    // Clear cart
    cartCtx.clearCart();
    
    // Clear any authentication tokens or user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Clear cart items from localStorage
    localStorage.removeItem('cartItems');
    
    // Navigate to login page
    navigate('/');
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>Food Order</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/meals"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Meals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="nav-actions">
          <button 
            className="cart-button" 
            onClick={handleShowCart}
            aria-label="Open Cart"
            title="View Cart"
          >
            <ShoppingCartOutlined />
            Cart
            {totalCartItems > 0 && (
              <span className="cart-count">{totalCartItems}</span>
            )}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;