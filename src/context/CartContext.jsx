import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // =========================
  // CARGAR DESDE LOCALSTORAGE
  // =========================
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // =========================
  // GUARDAR EN LOCALSTORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // AGREGAR PRODUCTO
  // =========================
  const addItem = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id
      );

      const currentQty = existing ? existing.quantity : 0;
      const newQty = currentQty + quantity;

      // VALIDACIÓN DE STOCK
      if (newQty > product.stock) {
        toast.error(`Stock máximo disponible: ${product.stock}`);
        return prev;
      }

      if (existing) {

        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: newQty }
            : item
        );
      }

      toast.success("Producto agregado al carrito");

      return [...prev, { product, quantity }];
    });
  };

  // =========================
  // ELIMINAR PRODUCTO
  // =========================
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));
    toast.info("Producto eliminado del carrito");
  };

  // =========================
  // LIMPIAR CARRITO
  // =========================
  const clearCart = () => {
    if (cart.length === 0) return;

    setCart([]);
    toast.success("Carrito vaciado correctamente");
  };

  // =========================
  // TOTALES
  // =========================
  const totalQuantity = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.quantity *
        (item.product.discountActive
          ? item.product.price -
            (item.product.price * item.product.discount) / 100
          : item.product.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
