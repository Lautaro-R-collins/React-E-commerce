import api from "../config/api";

export const getReviews = async (productId) => {
  const res = await api.get(`/reviews/${productId}`);
  return res.data;
};

export const createReview = async (productId, data) => {
  const res = await api.post(`/reviews/${productId}`, data);
  return res.data;
};
