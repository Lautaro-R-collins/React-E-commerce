import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CardProduct from "../components/products/CardProduct.jsx";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

export default function SearchResults() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!queryParam || queryParam.trim().length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND}/products/search`, {
          params: { query: queryParam.trim() },
        });
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [queryParam]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Resultados de {queryParam}</h1>

      {loading && <p className="text-gray-500">Buscando...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">No se encontraron resultados</p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
