import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/auth";

axios.defaults.withCredentials = true;

export const registerService = async (data, reset) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201 || response.status === 200) {
      if (reset) reset();
    }
  } catch (error) {
    console.error("Error en registerService:", error);
  }
};

export const getProfileService = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error en getProfileService:", error?.response?.data || error);
    throw error;
  }
};

export const loginService = () => {};
export const logoutService = () => {};
