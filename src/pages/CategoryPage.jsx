import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useProduct } from "../context/productContext.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

import CardProduct from "../components/products/CardProduct.jsx";
import CategoryHeader from "../components/category/CategoryHeader.jsx";
import ProductSkeleton from "../components/products/ProductSkeleton.jsx";
import ConnectionError from "../components/ui/ConnectionError.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import Breadcrumbs from "../components/ui/Breadcrumbs.jsx";
import CarruselText from "../components/ui/CarruselText.jsx";

import { CATEGORY_BACKGROUNDS } from "../config/categoryBackgrounds";

const PRODUCTS_PER_PAGE = 8;

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const { discountedProducts } = useProduct();
  const catalogRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const isOffersPage = category === "ofertas";

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1);

      const params = {};
      if (category) params.category = category.toLowerCase();
      if (subcategory) params.subcategory = subcategory.toLowerCase();

      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/products",
        { params }
      );

      setProducts(response.data);
    } catch (err) {
      console.error("Error loading category products:", err);

      if (!navigator.onLine || !err.response) {
        setError({ type: "NETWORK" });
      } else {
        setError({
          type: "SERVER",
          message: err.response?.data?.message || "Error cargando productos",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [category, subcategory]);

  useEffect(() => {
    if (isOffersPage) {
      setProducts(discountedProducts);
      setLoading(false);
      setError(null);
      setCurrentPage(1);
    } else {
      fetchProducts();
    }
  }, [isOffersPage, fetchProducts, discountedProducts]);

  // PAGINADO
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    return products.slice(start, end);
  }, [products, currentPage]);

  // HEADER CONFIG
  const categoryKey = category?.toLowerCase();
  const backgroundImage =
    CATEGORY_BACKGROUNDS[categoryKey] || CATEGORY_BACKGROUNDS.default;

  // ERROR DE CONEXIÓN
  if (!loading && error?.type === "NETWORK") {
    return <ConnectionError onRetry={fetchProducts} />;
  }

  return (
    <div>
      <CategoryHeader backgroundImage={backgroundImage} />
      <CarruselText />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          {
            label: category?.charAt(0).toUpperCase() + category?.slice(1),
            href: `/category/${category}`,
          },
          subcategory && {
            label: subcategory?.charAt(0).toUpperCase() + subcategory?.slice(1),
          },
        ].filter(Boolean)}
      />

      {/* ERROR DE SERVIDOR */}
      {!loading && error?.type === "SERVER" && (
        <p className="text-center mt-6 text-red-500 font-semibold">
          {error.message}
        </p>
      )}

      {/* ANCLA DE SCROLL */}
      <h2 ref={catalogRef} className="sr-only">
        Catálogo
      </h2>

      <div className="grid px-4 md:px-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {loading ? (
          Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        ) : paginatedProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay productos en esta categoría.
          </p>
        ) : (
          paginatedProducts.map((p) => <CardProduct key={p._id} product={p} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        scrollRef={catalogRef}
      />
    </div>
  );
};

export default CategoryPage;
