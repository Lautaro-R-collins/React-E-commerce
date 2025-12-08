import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFavorites from "../../context/useFavorites";

export default function NavFavorites() {
  const { favorites } = useFavorites();

  return (
    <Link to="/favorites">
      <div className="relative text-[#03265D] flex items-center">
        <FaHeart size={24} />

        {favorites.length > 0 && (
          <span className="absolute -top-3 -right-4 bg-[#0a7b8f] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {favorites.length}
          </span>
        )}
      </div>
    </Link>
  );
}
