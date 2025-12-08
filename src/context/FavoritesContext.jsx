import { createContext, useState, useEffect } from "react";

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
    if (!favorites.some((fav) => fav._id === product._id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (_id) => {
    setFavorites(favorites.filter((fav) => fav._id !== _id));
  };

  const clearFavorites = () => setFavorites([]);

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
