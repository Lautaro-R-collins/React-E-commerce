import { Link } from "react-router-dom";
import { FaShoppingCart, FaChevronDown, FaBars } from "react-icons/fa";

const categories = {
  Todo: [],
  Ropa: ["Remeras", "Pantalones", "Zapatos", "Accesorios"],
  Electrónica: ["Celulares", "Tablet", "Notebook"],
  Hogar: ["Muebles", "Jardín", "Cocina"],
  Ofertas: [],
};

export default function NavBar() {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-base-200">
      {/* MOBILE - DRAWER */}
      <div className="drawer md:hidden">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <nav className="navbar bg-base-200 px-4">
            <Link to="/" className="font-bold text-xl">
              Tienda
            </Link>
            
            <div className="ml-auto flex items-center gap-3">
              <button>
                <FaShoppingCart className="h-6 w-6 text-[#0a194b]" />
              </button>

              <label htmlFor="menu-drawer">
                <FaBars className="h-6 w-6 text-[#0a194b]" />
              </label>
            </div>
          </nav>
        </div>

        {/* SIDEBAR MOBILE */}
        <div className="drawer-side z-50">
          <label
            htmlFor="menu-drawer"
            className="drawer-overlay bg-black/70"
          ></label>
          <ul className="menu p-4 w-40 min-h-full bg-white border-r border-gray-200 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Categorías</h2>
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
                  {" "}
                  <details className="group no-marker">
                    <summary className="font-semibold flex items-center cursor-pointer">
                      {cat}
                    </summary>

                    <ul className="pl-4 py-1 space-y-1 mt-2">
                      {subcats.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/category/${cat.toLowerCase()}/${sub.toLowerCase()}`}
                            className="text-sm"
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
        <nav className="navbar bg-base-200 px-4">
          <div className="flex-1">
            <Link to="/" className="normal-case text-xl">
              Tienda
            </Link>
          </div>

          <div className="flex-none flex gap-2 items-center">
            <button className="cursor-pointer">
              <FaShoppingCart className="h-6 w-6 text-[#0a194b]" />
            </button>
          </div>
        </nav>

        <nav className="bg-[#0a194b] text-white flex justify-center gap-6 py-2 shadow-xl">
          {Object.keys(categories).map((cat) => {
            const subcats = categories[cat];

            if (subcats.length === 0) {
              return (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  className="flex items-center gap-1 px-3 py-1 rounded-md font-semibold hover:bg-white/20 transition-all"
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
                  className="flex items-center gap-1 px-3 py-1 rounded-md font-semibold hover:bg-white/20 transition-all cursor-pointer"
                >
                  {cat}
                  <FaChevronDown className="text-xs opacity-80" />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 rounded-lg shadow-xl bg-white text-black w-48 border border-gray-200"
                >
                  {subcats.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/category/${cat.toLowerCase()}/${sub.toLowerCase()}`}
                        className="hover:bg-[#0a194b]/20 rounded-md"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
      </nav>
    </header>
  );
}
