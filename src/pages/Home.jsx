import { useProduct } from "../context/productContext.jsx";
import { useState, useMemo, useRef } from "react";

import SliderHome from "../components/home/CarruselImg.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import CategoriesHome from "../components/home/CategoriesHome.jsx";
import CardProduct from "../components/products/CardProduct.jsx";
import HomeBanner from "../components/home/HomeBanner.jsx";
import BackFeature from "../components/home/BackFeatures.jsx";
import ProductSkeleton from "../components/products/ProductSkeleton.jsx";
import ConnectionError from "../components/ui/ConnectionError.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import CarruselText from "../components/ui/CarruselText.jsx";

export const Home = () => {
  const { products, loading, error, refetch } = useProduct();
  const catalogTitleRef = useRef(null);
  // PAGINADO
  const PRODUCTS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    return products.slice(start, end);
  }, [products, currentPage]);

  // MANEJO DE ERRORES
  if (!loading && error?.type === "NETWORK") {
    return <ConnectionError onRetry={refetch} />;
  }

  if (!loading && error?.type === "SERVER") {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        {error.message || "Error del servidor"}
      </div>
    );
  }

  return (
    <div>
      <SliderHome />
      <CarruselText />
      <FeaturedProducts />
      <CategoriesHome />

      <h1 ref={catalogTitleRef} className="text-3xl text-center font-bold my-6">
        Explora nuestro catálogo
      </h1>

      {/* Renderizado de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center px-4 md:px-20">
        {loading
          ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : paginatedProducts.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        scrollRef={catalogTitleRef}
      />

      <HomeBanner />
      <BackFeature />
    </div>
  );
};
