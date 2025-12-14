import { useState, useEffect } from "react";

const dataCarrusel = [
  { id: 1, text: "Descuentos de hasta el 50%" },
  { id: 2, text: "Envío gratis en pedidos superiores a $5.000" },
  { id: 3, text: "Nueva colección de ropa de verano ya disponible" },
];

function CarruselText() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % dataCarrusel.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#03265D] text-white text-sm font-semibold overflow-hidden flex items-center justify-center p-1">
      <div className="transition-all duration-500">
        {dataCarrusel[current].text}
      </div>
    </div>
  );
}

export default CarruselText;
