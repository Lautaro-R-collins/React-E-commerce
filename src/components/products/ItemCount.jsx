// src/components/products/ItemCount.jsx
import { FaPlus, FaMinus } from "react-icons/fa";

const ItemCount = ({ stock, count, setCount }) => {
  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="flex items-center gap-4 justify-center">
      <button
        onClick={decrement}
        className="bg-gray-200 rounded-md px-3 py-2 cursor-pointer"
      >
        <FaMinus />
      </button>

      <span className="text-lg font-semibold">{count}</span>

      <button
        onClick={increment}
        className="bg-gray-200 rounded-md px-3 py-2 cursor-pointer"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default ItemCount;
