import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import Authbuttons from "./authbuttons.jsx";
import Avatar from "./avatar.jsx";

import logo from "../../assets/logo/LogoTiendita.png";
import logoMobil from "../../assets/logo/logoTienditaMobil.png";
import { FaShoppingCart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const categories = {
  Todo: [],
  Ropa: ["Remeras", "Pantalones", "Zapatos", "Accesorios"],
  Electrónica: ["Celulares", "Tablet", "Notebook"],
  Hogar: ["Muebles", "Jardín", "Cocina"],
  Ofertas: [],
};

export default function NavBar() {
  const { loading, userInfo } = useUser();
  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      {/* MOBILE - DRAWER */}
      <div className="drawer drawer-end md:hidden">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <nav className="navbar bg-white px-4 relative z-50">
            <Link to="/" className="flex items-center">
              <img src={logoMobil} alt="Logo" className="h-9 w-auto" />
            </Link>

            <div className="ml-auto flex items-center gap-3">
              <button>
                <FaShoppingCart className="h-6 w-6 text-[#03265D]" />
              </button>
              {!loading && !userInfo.id && <Authbuttons />}
              {!loading && userInfo.id && <Avatar />}
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

          {/* Sidebar */}
          <ul className="menu p-4 w-60 min-h-full bg-white border-l border-gray-200 shadow-xl relative">
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
              className="flex items-center gap-1 px-3 py-1 font-medium hover:bg-white/20 transition-all"
            >
              Inicio
            </Link>

            {/* Categorías */}
            {Object.keys(categories).map((cat) => {
              const subcats = categories[cat];

              if (subcats.length === 0) {
                return (
                  <li key={cat} className="mb-1">
                    <Link
                      to={`/category/${cat.toLowerCase()}`}
                      className="font-medium"
                    >
                      {cat}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={cat} className="mb-1">
                  <details className="group no-marker">
                    <summary className="font-medium flex items-center cursor-pointer">
                      {cat}
                    </summary>

                    <ul>
                      {subcats.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/category/${cat.toLowerCase()}/${sub.toLowerCase()}`}
                            className="text-sm "
                          >
                            {sub}
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

      {/* NAVBAR DESKTOP */}
      <nav className="hidden md:block">
        <div className="navbar bg-white px-4">
          <div className="flex-1">
            <Link to="/" className="inline-flex items-center w-auto">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto pointer-events-auto"
              />
            </Link>
          </div>

          <div className="flex-none flex gap-2 items-center">
            <button className="cursor-pointer">
              <FaShoppingCart className="h-6 w-6 text-[#03265D]" />
            </button>
            {!loading && !userInfo.id && <Authbuttons />}
            {!loading && userInfo.id && <Avatar />}
          </div>
        </div>

        {/* Desktop categories bar */}
        <div className="bg-[#03265D] text-white flex justify-center gap-6  shadow-xl">
          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-1 font-semibold hover:bg-white/20 transition-all"
          >
            Inicio
          </Link>
          {Object.keys(categories).map((cat) => {
            const subcats = categories[cat];

            if (subcats.length === 0) {
              return (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  className="flex items-center gap-1 px-3 py-1 font-semibold hover:bg-white/20 transition-all"
                >
                  {cat}
                </Link>
              );
            }

            return (
              <div key={cat} className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-1 px-3 py-1 font-semibold hover:bg-white/20 transition-all cursor-pointer"
                >
                  {cat}
                  <FaChevronDown className="text-xs opacity-80" />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu shadow-xl bg-white text-black w-48 border border-gray-200"
                >
                  {subcats.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/category/${cat.toLowerCase()}/${sub.toLowerCase()}`}
                        className="hover:bg-[#03265D]/30"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
