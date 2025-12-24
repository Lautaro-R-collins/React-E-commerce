import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/productContext.jsx";
import Breadcrumbs from "../components/ui/Breadcrumbs.jsx";
import ProductGallery from "../components/products/ProductGallery.jsx";
import ProductInfo from "../components/products/ProductInfo.jsx";
import ProductReviews from "../components/products/ProductReviews.jsx";
import RelatedProducts from "../components/products/RelatedProducts.jsx";

const DetailProduct = () => {
  const { id } = useParams();
  const { product, productLoading, error, getProductById, products } =
    useProduct();

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id, getProductById]);

  if (productLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
        <span className="loading loading-dots loading-xl text-[#03265D]"></span>
        <p className="text-gray-600 font-medium">Cargando productos</p>
      </div>
    );
  }

  if (error || !product?._id) {
    return (
      <p className="text-center py-10 text-red-500">Producto no encontrado</p>
    );
  }

  /** RELATED PRODUCTS **/
  const relatedProducts = products
    ?.filter((p) => p.category === product.category && p._id !== product._id)
    ?.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          {
            label: product.category,
            href: `/category/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <h2 className="text-3xl font-bold text-center mb-10">{product.name}</h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ==== GALERIA ==== */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* ==== INFO PRODUCTO ==== */}
        <ProductInfo product={product} />
      </div>

      {/* ==== REVIEWS ==== */}
      <ProductReviews productId={product._id} />

      {/* ==== PRODUCTOS RELACIONADOS ==== */}
      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default DetailProduct;
