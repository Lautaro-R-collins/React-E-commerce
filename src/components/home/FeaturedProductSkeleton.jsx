const FeaturedProductSkeleton = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg gap-2">
      <div className="skeleton w-20 h-20 rounded"></div>
      <div className="skeleton h-4 w-24"></div>
      <div className="skeleton h-4 w-16"></div>
    </div>
  );
};

export default FeaturedProductSkeleton;
