// src/components/home/Features.jsx
import CardFeature from "./CardFeature.jsx";
import { homeFeatures } from "../../mocks/homeFeatures.mock";

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-6 sm:flex-row sm:flex-wrap sm:gap-12 lg:justify-center">
      {homeFeatures.map((feature) => (
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
