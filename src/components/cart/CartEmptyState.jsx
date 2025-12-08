import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";

const CartEmptyState = ({ onClose }) => {
  return (
    <div className="text-center mt-14 flex flex-col items-center">
      <div className="text-gray-400">
        <LuShoppingCart size={100} strokeWidth={1.25} />
      </div>

      <h2 className="text-xl font-semibold mt-6 text-gray-700">
        Tu carrito está vacío
      </h2>

      <p className="text-gray-500 mt-2 max-w-xs">Explora nuestros productos.</p>

      <Link
        onClick={onClose}
        to="/"
        className="mt-6 px-4 py-2 bg-[#03265D] rounded font-bold text-white hover:bg-[#02193d]"
      >
        Ir al catálogo
      </Link>
    </div>
  );
};

export default CartEmptyState;
