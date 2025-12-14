import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useFavorites from "../../context/useFavorites";

const CardProduct = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const toggleFavorite = () => {
    isFavorite(product._id)
      ? removeFromFavorites(product._id)
      : addToFavorites(product);
  };

  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden max-w-xs w-full flex flex-col transition-transform duration-200 hover:scale-[1.02]">
      {/* add favorites */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-10 text-xl cursor-pointer hover:scale-110 transition-transform"
      >
        <FaHeart
          className={isFavorite(product._id) ? "text-red-500" : "text-gray-300"}
        />
      </button>
      {/* product */}
      <Link to={`/product/${product._id}`} className="block bg-gray-100">
        <div className="w-full h-52 bg-gray-100">
          {product.images && product.images.length > 1 ? (
            <figure className="hover-gallery h-full">
              {product.images.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name}-${idx}`}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                />
              ))}
            </figure>
          ) : (
            <img
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-contain p-2"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-semibold text-black">{product.name}</h3>

          <div className="flex items-center gap-2">
            {product.discountActive ? (
              <>
                <span className="text-gray-400 line-through font-semibold">
                  ${product.price}
                </span>

                <span className="text-green-600 font-bold">
                  $
                  {Math.round(
                    product.price - (product.price * product.discount) / 100
                  )}
                </span>
              </>
            ) : (
              <span className="text-black font-bold text-lg">
                ${product.price}
              </span>
            )}
            {product.discountActive && (
              <p className="text-red-600 font-semibold text-xs -mt-3 relative">
                {product.discount}% OFF
              </p>
            )}
          </div>

          <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
