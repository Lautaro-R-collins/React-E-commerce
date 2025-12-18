import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { UserProvider } from "../context/userContext";
import { ProductProvider } from "../context/productContext";

export default function AppProviders({ children }) {
  return (
    <FavoritesProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </UserProvider>
    </FavoritesProvider>
  );
}
