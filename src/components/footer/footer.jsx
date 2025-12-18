import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#03265D] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold mb-2">Tienda</h3>
          <p className="text-white/70 text-sm">
            Productos seleccionados para mejorar tu setup.
            Calidad, buen precio y envíos a todo el país.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-3">Navegación</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>
              <Link to="/" className="hover:text-white transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-white transition">
                Favoritos
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-white transition">
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h4 className="font-semibold mb-3">Contacto</h4>
          <ul className="text-sm text-white/80 flex flex-col gap-2">
            <li>Email: contacto@tiendita.com</li>
            <li>WhatsApp: +54 9 11 1234-5678</li>
            <li>Argentina</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-white/60">
        © {new Date().getFullYear()} Tiendita. Todos los derechos reservados.
      </div>
    </footer>
  );
};
