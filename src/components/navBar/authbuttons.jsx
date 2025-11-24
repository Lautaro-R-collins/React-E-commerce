import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function AuthButtons() {
  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <label tabIndex={0} className="avatar cursor-pointer">
        <FaUser className="h-[22px] w-[22px] text-[#03265D]" />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content z-50 menu p-2 shadow-xl bg-white rounded-lg w-44 border border-gray-200"
      >
        <li>
          <Link
            to="/login"
            className=" rounded-md font-medium hover:bg-[#03265D]/30"
          >
            Iniciar sesión
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="rounded-md font-medium hover:bg-[#03265D]/30"
          >
            Registrarse
          </Link>
        </li>
      </ul>
    </div>
  );
}
