import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { logoutService } from "../../services/authService.js";
import { LuLayoutDashboard, LuUser, LuLogOut } from "react-icons/lu";

// 🔒 helper seguro
const getAvatarUrl = (avatar) => {
  if (!avatar) return null;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) return null;

  const cleanBackendUrl = backendUrl.replace(/\/api\/?$/, "");
  return `${cleanBackendUrl}${avatar}?t=${Date.now()}`;
};

// 🎨 color estable por usuario
const stringToColor = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 45%)`;
};

const getInitial = (name = "") => (name ? name.charAt(0).toUpperCase() : "?");

const Avatar = () => {
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();

  const avatarUrl = getAvatarUrl(userInfo?.avatar);
  const initial = getInitial(userInfo?.username);
  const bgColor = stringToColor(userInfo?.username);

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
      <div tabIndex={0} role="button" className="cursor-pointer">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: bgColor }}
            >
              {initial}
            </div>
          )}
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
