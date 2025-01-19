import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

// Components
import LandingPage from "./Pages/LandingPage";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Navigation from "./components/Navigation";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Home from "./Pages/Home";
import MealsPage from "./Pages/MealsPage";
import Contact from "./components/Contact";

// Context Providers
import { AuthContextProvider } from "./store/AuthContext";
import { OrderContextProvider } from "./store/OrderContext";
import { ProductContextProvider } from "./store/ProductContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <OrderContextProvider>
          <ProductContextProvider>
            <UserProgressContextProvider>
              <CartContextProvider>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/user-login" element={<UserLogin />} />
                  <Route path="/admin-login" element={<AdminLogin />} />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />

                  {/* User Routes */}
                  <Route
                    path="/home/*"
                    element={
                      <>
                        <Navigation />
                        <Routes>
                          <Route index element={<Home />} />
                          <Route path="meals" element={<MealsPage />} />
                          <Route path="contact" element={<Contact />} />
                        </Routes>
                        <Cart />
                        <Checkout />
                      </>
                    }
                  />

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <ToastContainer />
              </CartContextProvider>
            </UserProgressContextProvider>
          </ProductContextProvider>
        </OrderContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
