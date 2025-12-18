import { Routes, Route } from "react-router-dom";

import Layout from "../layout/layout.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import ProtectedRoute from "../components/protectedRoutes/protectedRoutes.jsx";
import ScrollToTop from "../components/ui/ScrollToTop.jsx";
// All Pages
import Home from "../pages/Home.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import DetailProductPage from "../pages/detailProductPage.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import SearchResultsPage from "../pages/SearchResultsPage.jsx";
import CheckoutForm from "../pages/CheckoutForm.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import DashboardHome from "../pages/admin/DashboardHome.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="product/:id" element={<DetailProductPage />} />
          <Route
            path="category/:category/:subcategory?"
            element={<CategoryPage />}
          />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="checkout" element={<CheckoutForm />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}
