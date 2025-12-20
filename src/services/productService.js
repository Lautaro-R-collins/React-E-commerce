import api from "../config/api";

export const getProductsService = async (params) => {
    try {
        const response = await api.get("/products", { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};
