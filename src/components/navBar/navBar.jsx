import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import Authbuttons from "./authbuttons.jsx";
import Avatar from "./avatar.jsx";
import CartWidget from "../cart/CartWidget.jsx";
import CartDrawer from "../cart/CartDrawer.jsx";
import MobileNavbar from "./MobileNavbar.jsx";
import DesktopCategories from "./DesktopCategories.jsx";
import SearchBar from "./SearchBar.jsx";
import NavFavorites from "./NavFavorites";

// Logo
import logo from "../../assets/logo/LogoTiendita.png";

// CATEGORIAS
const categories = {
  ropa: ["remeras", "pantalones", "zapatos", "accesorios"],
  tecnologia: ["celulares", "notebook", "otros"],
  hogar: ["muebles", "jardin"],
  electrodomesticos: [],
  ofertas: [],
};

export default function NavBar() {
  const { loading, userInfo } = useUser();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const handleLinkClick = () => setOpenDropdown(null);

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      {/* MOBILE */}
      <MobileNavbar
        loading={loading}
        userInfo={userInfo}
        setIsCartOpen={setIsCartOpen}
        categories={categories}
        handleLinkClick={handleLinkClick}
        capitalize={capitalize}
      />

      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:block bg-white">
        <div className="flex items-center px-6 py-2 gap-4">
          {/* logo */}
          <div className="flex-none">
            <Link to="/" className="inline-flex items-center">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* searchbar */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[300px]">
              <SearchBar />
            </div>
          </div>

          {/* iconos login + carrito */}
          <div className="flex-none flex gap-4 items-center">
            <button onClick={() => setIsCartOpen(true)}>
              <CartWidget />
            </button>

            <NavFavorites />

            {!loading && !userInfo.id && <Authbuttons />}
            {!loading && userInfo.id && <Avatar />}
          </div>
        </div>

        <DesktopCategories
          categories={categories}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          handleLinkClick={handleLinkClick}
          capitalize={capitalize}
        />
      </nav>

      {/* CARRITO */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
