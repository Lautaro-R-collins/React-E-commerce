import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <div className="breadcrumbs text-sm md:text-xl font-bold mb-6 px-4 md:px-20">
      <ul>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index}>
              {!isLast && item.href ? (
                <Link
                  to={item.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#03265D]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
