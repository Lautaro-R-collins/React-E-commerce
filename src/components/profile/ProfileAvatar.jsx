import { getAvatarUrl, getInitial, stringToColor } from "../../utils/avatar";

function ProfileAvatar({ user }) {
  const avatarUrl = getAvatarUrl(user.avatar);
  const initial = getInitial(user.username);
  const bgColor = stringToColor(user.username);

  return (
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
  );
}

export default ProfileAvatar;
