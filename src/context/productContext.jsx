import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
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

  // =========================
  // OBTENER TODOS LOS PRODUCTOS
  // =========================
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);

      if (!navigator.onLine || !err.response) {
        setError({ type: "NETWORK" });
      } else {
        setError({
          type: "SERVER",
          message: err.response?.data?.message || "Error interno del servidor",
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // =========================
  // OBTENER PRODUCTO POR ID
  // =========================
  const getProductById = useCallback(async (id) => {
    try {
      setProductLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error("Error fetching product:", err);

      if (!navigator.onLine || !err.response) {
        setError({ type: "NETWORK" });
      } else {
        setError({
          type: "NOT_FOUND",
          message: "Producto no encontrado",
        });
      }

      setProduct({});
    } finally {
      setProductLoading(false);
    }
  }, []);

  // =========================
  // PRODUCTOS CON DESCUENTO
  // =========================
  const discountedProducts = useMemo(() => {
    return products.filter((p) => p.discountActive && p.discount > 0);
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        discountedProducts,
        loading,
        error,

        product,
        productLoading,

        getProducts,
        getProductById,

        refetch: getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
