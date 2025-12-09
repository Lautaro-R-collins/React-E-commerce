import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import useFavorites from "../context/useFavorites";
import CardProduct from "../components/products/CardProduct";
import CategoryHeader from "../components/category/CategoryHeader";

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  // Si no hay favoritos
  if (favorites.length === 0) {
    return (
      <div>
        {/* Encabezado */}
        <CategoryHeader title="Favoritos" />

        {/* Sin favoritos */}
        <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
          <FaRegHeart className="text-gray-400 text-7xl" />

          <p className="text-2xl sm:text-3xl font-semibold text-gray-700">
            No tienes productos en favoritos
          </p>

          <p className="text-gray-500 text-base">
            Guarda tus productos preferidos para acceder a ellos fácilmente
          </p>

          <Link
            to="/"
            className="mt-4 bg-[#03265D] cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#02193d] transition-colors"
          >
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Página con productos
  return (
    <div>
      <CategoryHeader title="Favoritos" />

      {/* Productos */}
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-10 mb-6">
        {favorites.map((p) => (
          <CardProduct key={p._id} product={p} />
        ))}
      </div>

      {/* Botón limpiar favoritos */}
      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={clearFavorites}
          className="mt-4 bg-[#03265D] cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#02193d] transition-colors"
        >
          Limpiar Favoritos
        </button>
      </div>
    </div>
  );
}
