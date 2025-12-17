import { useEffect, useState } from "react";
import { getProfileService, uploadAvatar } from "../services/authService";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";

// helpers
const getAvatarUrl = (avatar) => {
  if (!avatar) return null;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) return null;

  const cleanBackendUrl = backendUrl.replace(/\/api\/?$/, "");
  return `${cleanBackendUrl}${avatar}?t=${Date.now()}`;
};

const stringToColor = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 45%)`;
};

const getInitial = (name = "") => (name ? name.charAt(0).toUpperCase() : "?");

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { checkSession } = useUser();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfileService();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadAvatar(file);

      await checkSession(); // sincroniza navbar

      setUser((prev) => ({
        ...prev,
        avatar: res.avatar,
      }));

      toast.success("Avatar actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al subir avatar");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>No autorizado</p>;

  const avatarUrl = getAvatarUrl(user.avatar);
  const initial = getInitial(user.username);
  const bgColor = stringToColor(user.username);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-[#03265D]">
        Bienvenido {user.username}
      </h1>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center border">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-5xl font-semibold"
              style={{ backgroundColor: bgColor }}
            >
              {initial}
            </div>
          )}
        </div>
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <p className="text-lg font-semibold text-[#03265D]">
          Seleccionar una imagen de perfil
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#03265D]/10 file:text-[#03265D]
                     hover:file:bg-[#03265D]/20 cursor-pointer"
        />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p>
          <strong>Usuario:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
