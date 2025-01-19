import { useContext, useState } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../store/UserProgressContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [formErrors, setFormErrors] = useState({});

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function validateForm(customerData) {
    const errors = {};

    if (!customerData.name || customerData.name.trim().length < 2) {
      errors.name = "Please enter a valid name";
    }

    if (!customerData.email || !/\S+@\S+\.\S+/.test(customerData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!customerData.street || customerData.street.trim().length < 3) {
      errors.street = "Please enter a valid street address";
    }

    if (!customerData['postal-code'] || !/^\d{5,6}$/.test(customerData['postal-code'])) {
      errors['postal-code'] = "Please enter a valid postal code";
    }

    if (!customerData.city || customerData.city.trim().length < 2) {
      errors.city = "Please enter a valid city";
    }

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(customerData);
    
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    const orderData = {
      customer: customerData,
      items: cartCtx.items,
      totalAmount: cartTotal,
      date: new Date().toISOString()
    };

    try {
      const response = await fetch("https://food-json.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Order submitted successfully!", {
          position: "top-right",
          autoClose: 3000
        });

        cartCtx.clearCart();

        setTimeout(() => {
          userProgressCtx.hideCheckout();
        }, 3000);
      } else {
        throw new Error("Failed to submit order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);

      toast.error("Failed to submit order. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    }
  }

  return (
    <>
      <Modal 
        open={userProgressCtx.progress === "checkout"}
        className="checkout-modal"
      >
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: ₹{cartTotal.toFixed(2)}</p>

          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your full name" 
            />
            {formErrors.name && <p className="error">{formErrors.name}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">E-Mail Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email address" 
            />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="street">Street</label>
            <input 
              type="text" 
              id="street" 
              name="street" 
              placeholder="Enter your street address" 
            />
            {formErrors.street && <p className="error">{formErrors.street}</p>}
          </div>

          <div className="control-row">
            <div className="input-group">
              <label htmlFor="postal-code">Postal Code</label>
              <input 
                type="text" 
                id="postal-code" 
                name="postal-code" 
                placeholder="Enter postal code" 
              />
              {formErrors['postal-code'] && <p className="error">{formErrors['postal-code']}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder="Enter your city" 
              />
              {formErrors.city && <p className="error">{formErrors.city}</p>}
            </div>
          </div>

          <p className="modal-actions">
            <Button type="button" textOnly onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Submit Order</Button>
          </p>
        </form>
      </Modal>

      <ToastContainer />
    </>
  );
}
