import { LuWifiOff, LuRefreshCcw } from "react-icons/lu";

const ConnectionError = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <LuWifiOff className="text-[200px] text-gray-400 mb-4" />

      <h2 className="text-2xl font-bold mb-2">
        Sin conexión a internet
      </h2>

      <p className="text-gray-500 max-w-md mb-6">
        No pudimos cargar los productos. Verificá tu conexión a internet y volvé a intentarlo.
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center cursor-pointer gap-2 bg-[#03265D] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          <LuRefreshCcw className="size-4" />
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ConnectionError;
