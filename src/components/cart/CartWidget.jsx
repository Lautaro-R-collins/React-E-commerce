import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../context/useCart.js";

export default function CartWidget() {
  const { totalQuantity } = useCart();

  return (
    <div className="relative cursor-pointer">
      <FaShoppingCart className="h-6 w-6 text-[#03265D]" />

      {totalQuantity > 0 && (
        <span className="absolute -top-3 -right-4 bg-[#0a7b8f] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}
