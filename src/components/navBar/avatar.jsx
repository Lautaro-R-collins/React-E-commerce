import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { logoutService } from "../../services/authService.js";

// ICONOS
import {
  LuLayoutDashboard,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

const Avatar = () => {
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutService();
      setUserInfo({});
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="avatar cursor-pointer">
        <div className="w-10 rounded-full">
          <img src="https://i.pravatar.cc/300" alt="User avatar" />
        </div>
      </div>

      <ul className="dropdown-content menu p-2 shadow-xl bg-white rounded-lg w-48 border border-gray-200">
        {userInfo?.isAdmin && (
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-[#03265D]/15 rounded-md"
            >
              <LuLayoutDashboard />
              Panel admin
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:bg-[#03265D]/15 rounded-md"
          >
            <LuUser />
            Perfil
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="flex items-center gap-2 hover:bg-[#03265D]/15 rounded-md"
          >
            <LuSettings />
            Configuración
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-left hover:bg-[#03265D]/15 rounded-md w-full"
          >
            <LuLogOut />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
