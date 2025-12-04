import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";

const CardProduct = ({ product }) => {
  const { stock } = useUser();

  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden max-w-xs w-full flex flex-col transition-transform duration-200 hover:scale-[1.02]">
      {/* Imagen */}
      <Link to={`/product/${product._id}`} className="block bg-gray-100">
        <div className="w-full h-52 flex items-center justify-center bg-gray-100">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-semibold text-black">{product.name}</h3>

          <p className="text-gray-500 text-sm line-clamp-2">
            {product.description}
          </p>

          <p className="text-black font-bold text-lg">${product.price}</p>

          <p className="text-gray-600 text-sm">
            Stock: {product.stock ?? stock ?? "—"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
