import { FaTrashAlt } from "react-icons/fa";

const CartItemList = ({ cart, removeItem }) => {
  return (
    <>
      {cart.map((item) => {
        const product = item.product;
        const price = product.price || 0;
        const productId = product._id;

        return (
          <div
            key={productId}
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
              <p className="font-bold mt-1">${price * item.quantity}</p>
            </div>

            <button
              onClick={() => removeItem(productId)}
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
