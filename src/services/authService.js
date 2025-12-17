import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/auth";

axios.defaults.withCredentials = true;

export const getProfileService = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
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
    const response = await axios.post(`${API_URL}/login`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw { error: "Error de red o del servidor" };
  }
};

export const registerService = async (data, reset) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200 || response.status === 201) {
      reset && reset();
    }
  } catch (error) {
    console.error("Error en registerService:", error);
  }
};

export const logoutService = async () => {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
};


export const uploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('avatar', file)

  const { data } = await axios.put(
    `${API_URL}/avatar`,
    formData,
    {
      withCredentials: true,
    }
  )

  return data
}
