import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    const exists = favorites.some((fav) => fav._id === product._id);
    if (exists) return;

    setFavorites((prev) => [...prev, product]);

    toast.success("Producto agregado a favoritos");
  };

  const removeFromFavorites = (_id) => {
    setFavorites((prev) => prev.filter((fav) => fav._id !== _id));

    toast.info("Producto eliminado de favoritos");
  };

  const clearFavorites = () => {
    setFavorites([]);

    toast.success("Favoritos limpiados");
  };

  const isFavorite = (_id) => favorites.some((fav) => fav._id === _id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
