import { FaTruck, FaRegCreditCard, FaShieldAlt } from "react-icons/fa";
import CardFeature from "./CardFeature.jsx";

const featuresData = [
  {
    id: 1,
    icon: FaRegCreditCard,
    title: "Elegí cómo pagar",
    description:
      "Podés pagar con tarjeta, débito, efectivo o con Cuotas sin Tarjeta.",
  },
  {
    id: 2,
    icon: FaTruck,
    title: "Envío gratis",
    description:
      "Tenes envio sin costo en todos nuestros productos a partir de 5.000$",
  },
  {
    id: 3,
    icon: FaShieldAlt,
    title: "Seguridad",
    description:
      "No hay nada que no puedas hacer, porque estás siempre protegido.",
  },
];

export const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-6  sm:flex-row sm:flex-wrap sm:gap-12 lg:justify-center">
      {featuresData.map((feature) => (
        <CardFeature
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default Features;
