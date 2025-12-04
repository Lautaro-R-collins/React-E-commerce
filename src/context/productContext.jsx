import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_BACKEND_URL + "/products";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({});
  const [productLoading, setProductLoading] = useState(true);

  const [error, setError] = useState(null);

  // Obtener TODOS los productos
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL);

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  //  Obtener un producto por ID
  const getProductById = useCallback(async (id) => {
    try {
      setProductLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Producto no encontrado");
      setProduct({});
    } finally {
      setProductLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        // Estados globales
        products,
        loading,
        error,

        // Un producto
        product,
        productLoading,

        // Funciones
        getProducts,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
