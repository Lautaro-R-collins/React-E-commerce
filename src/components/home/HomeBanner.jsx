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
          items-center justify-around
        "
        style={{
          backgroundImage:
            "url('https://www.therange.co.uk/media/8/6/1650893514_12_1829.jpg')",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative text-white max-w-xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            ¿Listo para mejorar tu setup?
          </h2>
          <p className="text-white/80 text-sm md:text-base font-semibold">
            Descubrí productos seleccionados con descuentos exclusivos y stock
            limitado. Comprá hoy y recibilos en la puerta de tu casa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
