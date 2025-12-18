import { useEffect, useState } from "react";
import { getProfileService, uploadAvatar } from "../services/authService";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
// Components
import ProfileAvatar from "../components/profile/ProfileAvatar";
import AvatarUpload from "../components/profile/AvatarUpload";

const ProfilePage = () => {
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
      await checkSession();

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

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-[#03265D]">
        Bienvenido {user.username}
      </h1>

      <div className="flex flex-col items-center gap-4">
        <ProfileAvatar user={user} />
      </div>

      <AvatarUpload onChange={handleAvatarChange} />

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

export default ProfilePage;
