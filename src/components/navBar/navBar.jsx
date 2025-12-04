import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import Authbuttons from "./authbuttons.jsx";
import Avatar from "./avatar.jsx";
import CartWidget from "../cart/CartWidget.jsx";
import CartDrawer from "../cart/CartDrawer.jsx";

import logo from "../../assets/logo/LogoTiendita.png";
import logoMobil from "../../assets/logo/logoTienditaMobil.png";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

// CATEGORIAS
const categories = {
  todo: [],
  ropa: ["remeras", "pantalones", "zapatos", "accesorios"],
  tecnologia: ["celulares", "tablet", "notebook"],
  hogar: ["muebles", "jardin", "cocina"],
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
      {/* ========================= */}
      {/* MOBILE NAVBAR */}
      {/* ========================= */}
      <div className="drawer drawer-end md:hidden">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <nav className="navbar bg-white px-4 relative z-50">
            <Link to="/" className="flex items-center">
              <img src={logoMobil} alt="Logo" className="h-9 w-auto" />
            </Link>

            <div className="ml-auto flex items-center gap-3">
              {/* === CARRITO MOBILE === */}
              <button onClick={() => setIsCartOpen(true)} className="relative">
                <CartWidget />
              </button>

              {!loading && !userInfo.id && <Authbuttons />}
              {!loading && userInfo.id && <Avatar />}

              {/* HAMBURGER MENU */}
              <label htmlFor="menu-drawer" className="cursor-pointer">
                <FaBars className="h-6 w-6 text-[#03265D]" />
              </label>
            </div>
          </nav>
        </div>

        {/* MOBILE SIDEBAR */}
        <div className="drawer-side z-50">
          <label
            htmlFor="menu-drawer"
            className="drawer-overlay bg-black/90"
          ></label>

          <ul className="menu p-4 w-48 min-h-full bg-white border-l border-gray-200 shadow-xl relative">
            <label
              htmlFor="menu-drawer"
              className="absolute right-4 top-7 cursor-pointer"
            >
              <FaTimes className="h-6 w-6 text-[#03265D]" />
            </label>

            <h2 className="text-xl text-[#03265D] font-bold mb-4 mt-2">
              Categorías
            </h2>
            <div className="border-b border-gray-300 mb-4"></div>

            <Link
              to="/"
              className="flex items-center gap-1 px-3 py-1 font-medium hover:bg-white/20"
              onClick={() => {
                handleLinkClick();
                document.getElementById("menu-drawer").checked = false;
              }}
            >
              Inicio
            </Link>

            {Object.keys(categories).map((cat) => {
              const subcats = categories[cat];

              if (subcats.length === 0) {
                return (
                  <li key={cat} className="mb-1">
                    <Link
                      to={`/category/${cat}`}
                      className="font-medium"
                      onClick={() => {
                        handleLinkClick();
                        document.getElementById("menu-drawer").checked = false;
                      }}
                    >
                      {capitalize(cat)}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={cat} className="mb-1">
                  <details className="group no-marker">
                    <summary className="font-medium flex items-center cursor-pointer">
                      {capitalize(cat)}
                    </summary>

                    <ul>
                      <li>
                        <Link
                          to={`/category/${cat}`}
                          className="text-sm font-semibold"
                          onClick={() => {
                            handleLinkClick();
                            document.getElementById(
                              "menu-drawer"
                            ).checked = false;
                          }}
                        >
                          Todo {capitalize(cat)}
                        </Link>
                      </li>

                      {subcats.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/category/${cat}/${sub}`}
                            className="text-sm"
                            onClick={() => {
                              handleLinkClick();
                              document.getElementById(
                                "menu-drawer"
                              ).checked = false;
                            }}
                          >
                            {capitalize(sub)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ========================= */}
      {/* DESKTOP NAVBAR */}
      {/* ========================= */}
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

        {/* BARRA CATEGORÍAS DESKTOP */}
        <div className="bg-[#03265D] text-white flex justify-center gap-6 shadow-xl">
          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-1 font-semibold hover:bg-white/20 transition-all"
            onClick={handleLinkClick}
          >
            Inicio
          </Link>

          {Object.keys(categories).map((cat) => {
            const subcats = categories[cat];

            if (subcats.length === 0) {
              return (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className="flex items-center gap-1 px-3 py-1 font-semibold hover:bg-white/20 transition-all"
                  onClick={handleLinkClick}
                >
                  {capitalize(cat)}
                </Link>
              );
            }

            return (
              <div
                key={cat}
                className="dropdown relative"
                onMouseEnter={() => setOpenDropdown(cat)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div
                  tabIndex={0}
                  className="flex items-center gap-1 px-3 py-1 font-semibold hover:bg-white/20 cursor-pointer"
                >
                  {capitalize(cat)}
                  <FaChevronDown className="text-xs opacity-80 ml-1" />
                </div>

                {openDropdown === cat && (
                  <ul className="dropdown-content menu shadow-xl bg-[#03265D] text-white w-48 border-none absolute">
                    <li>
                      <Link
                        to={`/category/${cat}`}
                        className="hover:bg-white/20"
                        onClick={handleLinkClick}
                      >
                        Todo en {capitalize(cat)}
                      </Link>
                    </li>

                    {subcats.map((sub) => (
                      <li key={sub}>
                        <Link
                          to={`/category/${cat}/${sub}`}
                          className="hover:bg-white/20"
                          onClick={handleLinkClick}
                        >
                          {capitalize(sub)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ========================= */}
      {/* CARRITO */}
      {/* ========================= */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
