import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { logoutService } from "../../services/authService.js";

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
            <Link to="/dashboard" className="hover:bg-gray-100">
              Panel de administrador
            </Link>
          </li>
        )}

        <li>
          <Link to="/profile">Perfil</Link>
        </li>
        <li>
          <Link to="/settings">Configuración</Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="hover:bg-gray-100 text-left"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
