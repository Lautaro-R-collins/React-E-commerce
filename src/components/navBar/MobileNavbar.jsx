import { Link } from "react-router-dom";
import Authbuttons from "./authbuttons.jsx";
import Avatar from "./avatar.jsx";
import CartWidget from "../cart/CartWidget.jsx";

import logoMobil from "../../assets/logo/logoTienditaMobil.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function MobileNavbar({
  loading,
  userInfo,
  setIsCartOpen,
  categories,
  handleLinkClick,
  capitalize,
}) {
  return (
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

      {/* SIDEBAR MOBILE */}
      <div className="drawer-side z-50">
        <label
          htmlFor="menu-drawer"
          className="drawer-overlay bg-black/90"
        ></label>

        <ul className="menu p-4 w-48 min-h-full bg-white border-l border-gray-200 shadow-xl relative">
          {/* BOTÓN CERRAR */}
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

          {/* INICIO */}
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

          {/* LISTA DE CATEGORIAS */}
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
  );
}
