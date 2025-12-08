import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/cart";
axios.defaults.withCredentials = true;

// agregar al carrito
export const addToCartService = async (userId, productId, quantity = 1) => {
  try {
    const response = await axios.post(
      `${API_URL}/add`,
      { userId, productId, quantity },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error agregando al carrito:", error);
    throw error;
  }
};

// obtener el carrito del usurio

export const getCartService = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/get/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el carrito:", error);
    throw error;
  }
};

// vaciar carrito

export const clearCartService = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/clear/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error vaciando el carrito:", error);
    throw error;
  }
};

export const deleteProductCartService = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/delete/${userId}/${productId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error eliminando el producto del carrito:", error);
    throw error;
  }
};
