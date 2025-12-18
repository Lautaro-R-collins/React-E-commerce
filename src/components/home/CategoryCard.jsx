// src/components/home/CategoryCard.jsx
import { Link } from "react-router-dom";

const CategoryCard = ({ name, slug, image }) => {
  return (
    <Link
      to={`/category/${slug}`}
      className="bg-white shadow-lg hover:shadow-xl rounded-2xl transition-transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center p-4 w-full max-w-[170px] md:max-w-[230px] mx-auto"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 md:w-40 md:h-40 object-contain"
      />

      <p className="mt-3 font-semibold text-sm md:text-xl text-center leading-tight md:line-clamp-2">
        {name}
      </p>
    </Link>
  );
};

export default CategoryCard;
