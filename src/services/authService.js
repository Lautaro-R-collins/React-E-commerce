import api from "../config/api";

export const getProfileService = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const loginService = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw { error: "Error de red o del servidor" };
  }
};

export const registerService = async (data, reset) => {
  try {
    const response = await api.post("/auth/register", data);

    if (response.status === 200 || response.status === 201) {
      reset && reset();
    }
  } catch (error) {
    console.error("Error en registerService:", error);
  }
};

export const logoutService = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.put("/auth/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
