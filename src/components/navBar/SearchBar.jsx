import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/api.js";
import axios from "axios"; // Needed for CancelToken

import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cancelRef = useRef(null);

  const debounce = (fn, wait = 300) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  };

  const doSearch = async (value) => {
    const q = value?.trim();
    if (!q || q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      if (cancelRef.current) cancelRef.current.cancel();
      cancelRef.current = axios.CancelToken.source();

      const res = await api.get("/products/search", {
        params: { query: q },
        cancelToken: cancelRef.current.token,
      });

      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error("Search error:", err);
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(doSearch, 300), []);

  const handleSearch = (value) => {
    setQuery(value);
    debouncedSearch(value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (query.trim().length === 0) return;
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setResults([]);
    }
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center bg-gray-100 border border-[#c5c1c1] rounded-full px-3 shadow-2xs">
        <FaSearch className="w-5 h-5 text-[#03265D] mr-2" />

        <input
          type="text"
          value={query}
          placeholder="Buscar productos..."
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleEnter}
          className="flex-1 outline-none text-sm py-2"
          aria-label="Buscar productos"
        />
      </div>

      {/* DROPDOWN */}
      {(results.length > 0 || loading) && (
        <div className="absolute p-2 bg-white border border-[#c5c1c1] shadow-xl w-full rounded-md mt-1 max-h-60 overflow-y-auto z-500">
          {loading && (
            <div className="px-3 py-2  text-sm text-gray-500">Buscando...</div>
          )}

          {!loading &&
            results.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="block px-3 py-2 hover:bg-[#03265D]/15 rounded-md"
                onClick={() => {
                  setResults([]);
                  setQuery("");
                }}
              >
                <div className="text-sm font-medium">{product.name}</div>
              </Link>
            ))}

          {!loading && results.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              No hay resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
}
