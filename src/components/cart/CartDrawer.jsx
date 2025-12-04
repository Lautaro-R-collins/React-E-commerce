import useCart from "../../context/useCart.js";
import CartHeader from "./CartHeader";
import CartEmptyState from "./CartEmptyState";
import CartItemList from "./CartItemList";
import CartFooter from "./CartFooter";

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
        <CartHeader onClose={onClose} />

        {/* main */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <CartEmptyState onClose={onClose} />
          ) : (
            <CartItemList cart={cart} removeItem={removeItem} />
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <CartFooter
            totalPrice={totalPrice}
            clearCart={clearCart}
            onClose={onClose}
          />
        )}
      </div>
    </>
  );
};

export default CartDrawer;
