import { Routes, Route } from "react-router-dom";
import Layout from "../src/layout/layout.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import { CartProvider } from "./context/CartContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import { UserProvider } from "./context/userContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import Profile from "./pages/Profile.jsx";

// rutas pages
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { DetailProduct } from "./pages/detailProduct.jsx";
import ScrollToTop from "./components/ui/ScrollToTop.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import CheckoutForm from "./pages/CheckoutForm.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import DashboardHome from "./pages/admin/DashboardHome.jsx";
import ProtectedRoute from "./components/protectedRoutes/protectedRoutes.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";

function App() {
  return (
    <FavoritesProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="product/:id" element={<DetailProduct />} />
                <Route
                  path="/category/:category/:subcategory?"
                  element={<CategoryPage />}
                />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/checkout" element={<CheckoutForm />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </CartProvider>
        </ProductProvider>
      </UserProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </FavoritesProvider>
  );
}

export default App;
