import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  let updatedItems;

  switch (action.type) {
    case "ADD_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      updatedItems = [...state.items];

      if (existingCartItemIndex > -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      if (existingCartItemIndex > -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
          updatedItems.splice(existingCartItemIndex, 1);
        } else {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity - 1
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        }

        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return { ...state, items: updatedItems };
      }
      return state;
    }

    case "CLEAR_CART": {
      localStorage.removeItem("cartItems");
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: JSON.parse(localStorage.getItem("cartItems")) || []
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
