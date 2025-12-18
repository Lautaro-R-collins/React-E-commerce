// src/components/home/Categories.jsx
import CategoryCard from "./CategoryCard.jsx";
import { homeCategories } from "../../mocks/homeCategories.mock";

const Categories = () => {
  return (
    <div className="w-full mt-10 px-3">
      <h2 className="text-3xl font-bold my-6 text-center">Categorías</h2>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {homeCategories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
