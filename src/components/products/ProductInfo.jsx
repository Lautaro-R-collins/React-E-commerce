import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../context/useCart.js";
import ItemCount from "./ItemCount.jsx";

const ProductInfo = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantitySelected, setQuantitySelected] = useState(1);

  return (
    <div className="lg:w-1/2 flex flex-col gap-4">
      <p className="text-gray-700 text-lg">{product.description}</p>
      <div className="flex items-center gap-3">
        {product.discountActive ? (
          <>
            <p className="text-2xl text-gray-500 line-through font-semibold">
              ${product.price}
            </p>
            <p className="text-3xl font-bold text-green-600">
              $
              {Math.round(
                product.price - (product.price * product.discount) / 100
              )}
            </p>
          </>
        ) : (
          <p className="text-3xl font-bold">${product.price}</p>
        )}
        {product.discountActive && (
          <p className="text-red-600 font-semibold -mt-3 relative">
            {product.discount}% OFF
          </p>
        )}
      </div>

      <p className="text-green-600 font-semibold">
        Stock disponible: {product.stock}
      </p>

      <p className="text-gray-600 text-sm">Marca: {product.brand}</p>
      <p className="text-gray-600 text-sm">Categoría: {product.category}</p>

      <div className="mt-4 flex flex-col gap-4">
        {product.stock === 0 ? (
          <button className="btn btn-disabled w-full">Sin stock</button>
        ) : (
          <>
            <div className="flex justify-start">
              <ItemCount
                stock={product.stock}
                count={quantitySelected}
                setCount={setQuantitySelected}
              />
            </div>

            <div className="flex w-full gap-4">
              <button
                className="bg-[#03265D] cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#02193d] transition-colors flex items-center justify-center gap-2"
                onClick={() => addItem(product, quantitySelected)}
              >
                Agregar al carrito
              </button>

              <button
                className="bg-[#03265D] cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#02193d] transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  addItem(product, quantitySelected);
                  navigate("/checkout");
                }}
              >
                Comprar ahora
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
