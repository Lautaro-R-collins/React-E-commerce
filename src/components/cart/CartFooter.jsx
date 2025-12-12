import { Link } from "react-router-dom";

const CartFooter = ({ totalPrice, clearCart, onClose }) => {
  return (
    <div className="p-4 border-t bg-white absolute bottom-0 left-0 w-full">
      <div className="flex justify-between font-bold text-lg mb-3">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={clearCart}
          className="flex-1 bg-[#03265D] text-white font-bold py-2 rounded hover:bg-[#02193d] cursor-pointer"
        >
          Vaciar
        </button>

        <Link
          to="/checkout"
          onClick={onClose}
          className="flex-1 text-center bg-[#03265D] text-white font-bold py-2 rounded hover:bg-[#02193d]"
        >
          Finalizar
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;
