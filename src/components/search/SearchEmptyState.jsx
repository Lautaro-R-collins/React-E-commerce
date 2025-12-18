import { FiSearch } from "react-icons/fi";

function SearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <FiSearch className="text-7xl mb-6 opacity-70" />
      <p className="text-xl font-medium">No se encontraron resultados</p>
      <p className="text-sm mt-2 text-gray-500">
        Probá con otro término de búsqueda
      </p>
    </div>
  );
}

export default SearchEmptyState;
