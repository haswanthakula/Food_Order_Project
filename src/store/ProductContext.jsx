import { createContext, useReducer, useEffect, useState } from "react";

export const ProductContext = createContext({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  editProduct: () => {},
  isLoading: false,
  error: null
});

function productReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        )
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    default:
      return state;
  }
}

export function ProductContextProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://food-json.onrender.com/meals");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      setError(error.message);
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addProduct(product) {
    try {
      const response = await fetch("https://food-json.onrender.com/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const newProduct = await response.json();
      dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }

  async function removeProduct(productId) {
    try {
      const response = await fetch(`https://food-json.onrender.com/meals/${productId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      dispatch({ type: "REMOVE_PRODUCT", payload: productId });
    } catch (error) {
      console.error("Error removing product:", error);
      throw error;
    }
  }

  async function editProduct(product) {
    try {
      const response = await fetch(
        `https://food-json.onrender.com/meals/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product)
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const updatedProduct = await response.json();
      dispatch({ type: "EDIT_PRODUCT", payload: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  const contextValue = {
    products: state.products,
    addProduct,
    removeProduct,
    editProduct,
    isLoading,
    error
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
