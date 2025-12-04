import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardProduct from "../components/products/CardProduct.jsx";

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        if (category) params.category = category.toLowerCase();
        if (subcategory) params.subcategory = subcategory?.toLowerCase();

        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/products",
          { params }
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Error cargando productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading)
    return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-center my-6">
        {subcategory || category}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay productos en esta categoría.
          </p>
        ) : (
          products.map((p) => <CardProduct key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
