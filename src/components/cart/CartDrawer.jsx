import useCart from "../../context/useCart.js";
import { Link } from "react-router-dom";
import { FaTimes, FaTrashAlt, FaShoppingCart } from "react-icons/fa";

const CartDrawer = ({ isOpen, onClose }) => {
  const cartContext = useCart();

  if (!cartContext) return null;

  const { cart = [], removeItem, clearCart } = cartContext;

  const totalPrice = cart.reduce((acc, item) => {
    const price = item.product.price || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/70 z-9998" />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-9999 transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaShoppingCart size={24} className="text-gray-800" />
            <h2 className="text-xl font-bold text-gray-800">Carrito</h2>
          </div>

          <button onClick={onClose}>
            <FaTimes
              className="cursor-pointer text-gray-800 hover:text-red-500"
              size={22}
            />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-gray-600">Tu carrito está vacío</p>
              <Link
                onClick={onClose}
                to="/"
                className="inline-block mt-4 px-4 py-2 bg-[#03265D] rounded font-bold text-white"
              >
                Ir al catálogo
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const product = item.product;
              const price = product.price || 0;
              const productId = product._id;

              return (
                <div
                  key={productId}
                  className="flex gap-3 items-center border-b pb-2"
                >
                  <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Cantidad: {item.quantity}
                    </p>
                    <p className="font-bold mt-1">${price * item.quantity}</p>
                  </div>

                  <button
                    onClick={() => removeItem(productId)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
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
        )}
      </div>
    </>
  );
};

export default CartDrawer;