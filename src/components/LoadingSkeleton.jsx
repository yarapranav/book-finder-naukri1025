const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 bg-gray-300"></div>
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
