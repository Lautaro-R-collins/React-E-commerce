import { Routes, Route } from "react-router-dom";
import Layout from "../src/layout/layout.jsx";

import "./App.css";

// context
import { CartProvider } from "./context/CartContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import { UserProvider } from "./context/userContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";

// rutas pages
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { DetailProduct } from "./pages/detailProduct.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import CheckoutForm from "./pages/CheckoutForm.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

function App() {
  return (
    <FavoritesProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
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
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </FavoritesProvider>
  );
}

export default App;
