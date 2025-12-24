export const getAvatarUrl = (avatar) => {
  if (!avatar) return null;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) return null;

  const cleanBackendUrl = backendUrl.replace(/\/api\/?$/, "");
  return `${cleanBackendUrl}${avatar}?t=${Date.now()}`;
};

export const stringToColor = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 45%)`;
};

export const getInitial = (name = "") =>
  name ? name.charAt(0).toUpperCase() : "?";

export default getAvatarUrl;
