import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

export default function DesktopCategories({
  categories,
  openDropdown,
  setOpenDropdown,
  handleLinkClick,
  capitalize,
}) {
  return (
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
  );
}
