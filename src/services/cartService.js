import api from "../config/api";

// agregar al carrito
export const addToCartService = async (userId, productId, quantity = 1) => {
  try {
    const response = await api.post("/cart/add", {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error agregando al carrito:", error);
    throw error;
  }
};

// obtener el carrito del usurio

export const getCartService = async (userId) => {
  try {
    const response = await api.get(`/cart/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el carrito:", error);
    throw error;
  }
};

// vaciar carrito

export const clearCartService = async (userId) => {
  try {
    const response = await api.delete(`/cart/clear/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error vaciando el carrito:", error);
    throw error;
  }
};

export const deleteProductCartService = async (userId, productId) => {
  try {
    const response = await api.delete(`/cart/delete/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando el producto del carrito:", error);
    throw error;
  }
};
