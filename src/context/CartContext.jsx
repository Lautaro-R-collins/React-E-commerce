import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar producto
  const addItem = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);

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

      return [...prev, { product, quantity }];
    });
  };

  const clearCart = () => setCart([]);
  const removeItem = (id) =>
    setCart(cart.filter((item) => item.product._id !== id));

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, clearCart, removeItem, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
