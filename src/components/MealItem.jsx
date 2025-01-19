import { useContext } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "./Button.jsx";
import CartContext from "../store/CartContext.jsx";
import "./MealItem.css";

const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  // Helper function to get correct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "https://via.placeholder.com/400x300?text=No+Image";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `http://localhost:4000/${imageUrl}`;
  };

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item-admin-like">
      <div className="meal-item-admin-image">
        <img
          src={getImageUrl(meal.image)}
          alt={meal.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Food+Image";
          }}
        />
      </div>
      <div className="meal-item-admin-details">
        <div className="meal-item-admin-header">
          <h3>{meal.name}</h3>
          <span className="meal-item-admin-price">₹{meal.price}</span>
        </div>
        <p className="meal-item-admin-description">{meal.description}</p>
        <div className="meal-item-admin-actions">
          <Button onClick={handleAddMealToCart} className="add-to-cart-btn">
            <PlusCircleOutlined /> Add to Cart
          </Button>
        </div>
      </div>
    </li>
  );
};

export default MealItem;
