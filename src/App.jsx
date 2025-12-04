import { Routes, Route } from "react-router-dom";
import Layout from "../src/layout/layout.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";  // <-- IMPORTANTE
import "./App.css";

// rutas components
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { DetailProduct } from "./pages/detailProduct.jsx";
import CategoryPage from './pages/CategoryPage.jsx';

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider> {/* <-- ENVOLVER TODO */}
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
            </Route>
          </Routes>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
