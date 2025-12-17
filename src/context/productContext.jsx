import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  // GET ALL PRODUCTS
  // =========================
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      toast.error("Error al cargar productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // =========================
  // GET PRODUCT BY ID
  // =========================
  const getProductById = useCallback(async (id) => {
    try {
      setProductLoading(true);
      const res = await axios.get(`${API_URL}/${id}`);
      setProduct(res.data);
    } catch {
      toast.error("Producto no encontrado");
      setProduct({});
    } finally {
      setProductLoading(false);
    }
  }, []);

  // =========================
  // CREATE PRODUCT (ADMIN)
  // =========================
  const createProduct = async (data) => {
    try {
      await axios.post(API_URL, data);
      toast.success("Producto creado correctamente");
      await getProducts();
    } catch (err) {
      toast.error("Error al crear producto");
      console.error(err);
      throw err;
    }
  };

  // =========================
  // UPDATE PRODUCT (ADMIN)
  // =========================
  const updateProduct = async (id, data) => {
    try {
      await axios.put(`${API_URL}/${id}`, data);
      toast.success("Producto actualizado");
      await getProducts();
    } catch (err) {
      toast.error("Error al actualizar producto");
      console.error(err);
      throw err;
    }
  };

  // =========================
  // DELETE PRODUCT (ADMIN)
  // =========================
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Producto eliminado");
      await getProducts();
    } catch (err) {
      toast.error("Error al eliminar producto");
      console.error(err);
      throw err;
    }
  };

  // =========================
  // DISCOUNTED PRODUCTS
  // =========================
  const discountedProducts = useMemo(
    () => products.filter(p => p.discountActive && p.discount > 0),
    [products]
  );

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

        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
