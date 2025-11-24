import { Link } from "react-router-dom";

const Avatar = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="avatar cursor-pointer">
        <div className="w-10 rounded-full">
          <img src="https://i.pravatar.cc/300" alt="User avatar" />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-xl bg-white rounded-lg w-48 border border-gray-200"
      >
        <li>
          <Link to="/profile" className="hover:bg-gray-100">
            Perfil
          </Link>
        </li>
        <li>
          <Link to="/settings" className="hover:bg-gray-100">
            Configuración
          </Link>
        </li>
        <li>
          <button className="hover:bg-gray-100 text-left">Cerrar sesión</button>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
