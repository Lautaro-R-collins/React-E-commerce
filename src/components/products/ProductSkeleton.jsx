// Skeleton
const ProductSkeleton = () => {
  return (
    <div className="w-full max-w-xs bg-gray-200 rounded-lg shadow p-4 flex flex-col gap-3">
      <div className="skeleton h-40 w-full rounded"></div>
      <div className="skeleton h-4 w-3/4"></div>
      <div className="skeleton h-4 w-1/2"></div>
      <div className="skeleton h-8 w-full"></div>
    </div>
  );
};

export default ProductSkeleton;
