import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/productContext.jsx";
import useCart from "../context/useCart.js";

export const DetailProduct = () => {
  const { id } = useParams();
  const { product, productLoading, error, getProductById } = useProduct();
  const { addItem } = useCart();
  useEffect(() => {
    if (id) getProductById(id);
  }, [id, getProductById]);

  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl font-semibold">Cargando el producto...</p>
      </div>
    );
  }

  if (error || !product?._id) {
    return (
      <p className="text-center py-10 text-red-500">Producto no encontrado</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">{product.name}</h2>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full max-w-md rounded-xl object-cover shadow"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4">
          <p className="text-gray-700 text-lg">{product.description}</p>

          <p className="text-3xl font-bold">${product.price}</p>

          <p className="text-green-600 font-semibold">
            Stock disponible: {product.stock}
          </p>

          <p className="text-gray-600 text-sm">Marca: {product.brand}</p>

          <p className="text-gray-600 text-sm">Categoría: {product.category}</p>

          <div className="mt-4 flex flex-col gap-3">
            {product.stock === 0 ? (
              <button className="btn btn-disabled w-full">Sin stock</button>
            ) : (
              <>
                {/* AGREGA AL CARRITO */}
                <button
                  className="btn btn-neutral w-full"
                  onClick={() => addItem(product, 1)}
                >
                  Agregar al carrito
                </button>

                <button className="btn btn-primary w-full">
                  Comprar ahora
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {product.images?.length > 1 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Más imágenes</h3>
          <div className="flex gap-4 flex-wrap">
            {product.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Extra-${index}`}
                className="w-32 h-32 object-cover rounded-md shadow"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
