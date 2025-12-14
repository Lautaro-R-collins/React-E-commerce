export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  scrollRef,
}) {
  if (totalPages <= 1) return null;

  const handleChange = (page) => {
    onPageChange(page);

    scrollRef?.current?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  };

  return (
    <div className="flex justify-center mt-12 mb-16">
      <div className="join gap-2">
        {/* PREV */}
        <button
          onClick={() => handleChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="join-item font-bold px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          «
        </button>

        {/* PAGES */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => handleChange(page)}
              aria-label={`Page ${page}`}
              className={`join-item cursor-pointer font-bold px-4 py-2 rounded transition ${
                isActive
                  ? "bg-[#03265D] text-white hover:bg-[#02193d]"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={() => handleChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="join-item cursor-pointer font-bold px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          »
        </button>
      </div>
    </div>
  );
}
