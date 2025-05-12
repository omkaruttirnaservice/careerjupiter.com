import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingTestCard() {
  return (
    <div className="p-6">
      {/* Header section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 sm:mb-0">
          <Skeleton height={24} width={140} />
        </div>
        <div>
          <Skeleton height={36} width={160} />
        </div>
      </div>

      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative p-5 rounded-xl shadow-md border bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton circle height={48} width={48} />
              <Skeleton height={20} width={140} />
            </div>
            <Skeleton height={14} width={`80%`} className="mb-2" />
            <Skeleton height={14} width={`70%`} className="mb-2" />
            <Skeleton height={14} width={`50%`} className="mb-4" />
            <div className="absolute bottom-4 right-4">
              <Skeleton height={28} width={80} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingTestCard;
