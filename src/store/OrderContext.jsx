import { createContext, useState } from "react";

export const OrderContext = createContext({
  orders: [],
  addOrder: () => {},
  removeOrder: () => {}
});

export function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const removeOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const contextValue = {
    orders,
    addOrder,
    removeOrder
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}
