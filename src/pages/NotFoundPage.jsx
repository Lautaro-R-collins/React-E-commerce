import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center p-6">
      <FaSearch className="text-8xl text-[#03265D] mb-4 opacity-80" />

      <h2 className="text-9xl font-bold text-[#03265D] mb-3">404</h2>

      <p className="text-2xl text-gray-700 mb-6 font-semibold">
        Oops... la página que buscás no existe.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#03265D] text-white rounded-lg font-semibold hover:bg-[#001a40] transition-all"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
