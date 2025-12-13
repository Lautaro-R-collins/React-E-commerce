import { Link } from "react-router-dom";

export const HomeBanner = () => {
  return (
    <section className="w-full my-16">
      <div
        className="
          relative
          mx-auto
          bg-cover bg-center
          shadow-xl
          p-8 md:p-12
          flex flex-col md:flex-row
          items-center justify-between
          gap-6
        "
        style={{
          backgroundImage: "url('https://www.therange.co.uk/media/8/6/1650893514_12_1829.jpg')",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* CONTENIDO */}
        <div className="relative text-white max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            ¿Listo para mejorar tu setup?
          </h2>
          <p className="text-white/80 text-sm md:text-base">
            Descubrí productos seleccionados con descuentos exclusivos y stock limitado.
            Comprá hoy y recibilos en la puerta de tu casa.
          </p>
        </div>

        {/* CTA */}
        <div className="relative flex gap-4">
          <Link
            to="/"
            className="bg-white text-[#03265D] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Ver productos
          </Link>

          <Link
            to="/favorites"
            className="border border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Ver favoritos
          </Link>
        </div>
      </div>
    </section>
  );
};
