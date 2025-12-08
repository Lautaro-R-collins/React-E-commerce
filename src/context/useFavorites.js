import { useContext } from "react";
import FavoritesContext from "./FavoritesContext";

const useFavorites = () => useContext(FavoritesContext);
export default useFavorites;
