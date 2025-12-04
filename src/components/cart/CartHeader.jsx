import { FaTimes, FaShoppingCart } from "react-icons/fa";

const CartHeader = ({ onClose }) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      {/* titulo */}
      <div className="flex items-center gap-2">
        <FaShoppingCart size={24} className="text-gray-800" />
        <h2 className="text-xl font-bold text-gray-800">Carrito</h2>
      </div>

      {/* cerrar */}
      <button onClick={onClose}>
        <FaTimes
          className="cursor-pointer text-gray-800 hover:text-red-500"
          size={22}
        />
      </button>
    </div>
  );
};

export default CartHeader;
