import { FaShoppingCart } from "react-icons/fa";

export const cart = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button">
        <FaShoppingCart />
      </div>
    </div>
  );
};

export default cart;
