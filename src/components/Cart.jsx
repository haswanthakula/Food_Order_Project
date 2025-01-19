import Modal from "./Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./Cart.css";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function onIncrease(item) {
    cartCtx.addItem(item);
  }

  function onDecrease(item) {
    cartCtx.removeItem(item.id);
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li className="cart-item" key={item.id}>
            <div>
              <p>{item.name}</p>
              <p>₹{item.price}</p>
            </div>
            <p className="cart-item-actions">
              <button onClick={() => onDecrease(item)}>
                <MinusOutlined />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => onIncrease(item)}>
                <PlusOutlined />
              </button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total Price: ₹{cartTotal.toFixed(2)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go To Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
