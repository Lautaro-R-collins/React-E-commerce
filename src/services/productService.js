import api from "../config/api";

export const getProductsService = async (params) => {
  const response = await api.get("/products", { params });
  return response.data;
};
