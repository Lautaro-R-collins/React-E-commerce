import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LuLogIn, LuUserPlus } from "react-icons/lu";

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
            className="flex items-center gap-2 rounded-md font-medium hover:bg-[#03265D]/15"
          >
            <LuLogIn />
            Iniciar sesión
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-md font-medium hover:bg-[#03265D]/15"
          >
            <LuUserPlus />
            Registrarse
          </Link>
        </li>
      </ul>
    </div>
  );
}
