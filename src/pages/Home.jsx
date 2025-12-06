import { useProduct } from "../context/productContext.jsx";
import SliderHome from "../components/home/CarruselImg.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import CategoriesHome from "../components/home/CategoriesHome.jsx";
import CardProduct from "../components/products/CardProduct.jsx";

export const Home = () => {
  const { products, loading, error } = useProduct();

  if (loading)
    return (
      <div className="text-center mt-10 text-xl">Cargando productos...</div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div>
      <SliderHome />
      <FeaturedProducts />
      <CategoriesHome />
      <h1 className="text-3xl text-center font-bold my-6">
        Bienvenido a la tienda
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center px-4 md:px-20">
        {products.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
