import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../config/api";

import CardProduct from "../components/products/CardProduct.jsx";
import SearchEmptyState from "../components/search/SearchEmptyState.jsx";

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
        const res = await api.get("/products/search", {
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

      {!loading && results.length === 0 && queryParam.trim().length >= 2 && (
        <SearchEmptyState />
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
