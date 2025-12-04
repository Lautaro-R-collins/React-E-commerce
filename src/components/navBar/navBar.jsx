import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import Authbuttons from "./authbuttons.jsx";
import Avatar from "./avatar.jsx";
import CartWidget from "../cart/CartWidget.jsx";
import CartDrawer from "../cart/CartDrawer.jsx";
import MobileNavbar from "./MobileNavbar.jsx";
import DesktopCategories from "./DesktopCategories.jsx";

// Logo
import logo from "../../assets/logo/LogoTiendita.png";

// CATEGORIAS
const categories = {
  ropa: ["remeras", "pantalones", "zapatos", "accesorios"],
  tecnologia: ["celulares", "tablet", "notebook", "otros"],
  hogar: ["muebles", "jardin"],
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
      <nav className="hidden md:block">
        <div className="navbar bg-white px-4">
          <div className="flex-1">
            <Link to="/" className="inline-flex items-center w-auto">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-none flex gap-3 items-center">
            <button onClick={() => setIsCartOpen(true)}>
              <CartWidget />
            </button>

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
