// src/components/products/ItemCount.jsx
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const ItemCount = ({ stock, onAdd }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Controles */}
      <div className="flex items-center gap-4 justify-center">
        <button
          onClick={decrement}
          className="bg-gray-200 rounded-md px-3 py-2"
        >
          <FaMinus />
        </button>

        <span className="text-lg font-semibold">{count}</span>

        <button
          onClick={increment}
          className="bg-gray-200 rounded-md px-3 py-2"
        >
          <FaPlus />
        </button>
      </div>

      {/* Botón */}
      <button
        onClick={() => onAdd(count)}
        className={`w-full font-semibold py-2 rounded-md ${
          stock === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#033e8c] hover:bg-[#022b65] text-white"
        }`}
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
