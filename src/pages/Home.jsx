import { useProduct } from "../context/productContext.jsx";
import CardProduct from "../components/products/CardProduct.jsx";

export const Home = () => {
  const { products, loading, error } = useProduct();

  // Loading
  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">Cargando productos...</div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl text-center font-bold my-6">
        Bienvenido a la tienda
      </h1>

      {/* GRID de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {products.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
