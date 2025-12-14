import { FaTrashAlt } from "react-icons/fa";

const CartItemList = ({ cart, removeItem }) => {
  return (
    <>
      {cart.map((item) => {
        const product = item.product;

        const finalPrice = product.discountActive
          ? Math.round(product.price - (product.price * product.discount) / 100)
          : product.price;

        return (
          <div
            key={product._id}
            className="flex gap-3 items-center border-b pb-2"
          >
            <img
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.name}
              className="w-16 h-16 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>

              {/* PRECIOS */}
              {product.discountActive ? (
                <>
                  <p className="text-sm line-through text-gray-400">
                    ${product.price * item.quantity}
                  </p>
                  <p className="font-bold text-green-600">
                    ${finalPrice * item.quantity}
                  </p>
                </>
              ) : (
                <p className="font-bold">${finalPrice * item.quantity}</p>
              )}
            </div>

            <button
              onClick={() => removeItem(product._id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CartItemList;
