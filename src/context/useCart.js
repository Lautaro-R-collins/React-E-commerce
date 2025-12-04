import { useContext } from "react";
import CartContext from "./CartContext.jsx";

export default function useCart() {
  return useContext(CartContext);
}
