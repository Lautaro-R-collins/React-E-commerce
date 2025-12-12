import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/reviews";

axios.defaults.withCredentials = true;

export const getReviews = async (productId) => {
  const res = await axios.get(`${API_URL}/${productId}`);
  return res.data;
};

export const createReview = async (productId, data) => {
  const res = await axios.post(`${API_URL}/${productId}`, data);
  return res.data;
};
