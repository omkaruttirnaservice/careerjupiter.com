import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingTestCard() {
  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          <Skeleton height={24} width={120} />
          <Skeleton height={35} width={150} className="ml-3" />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative p-4 rounded-lg shadow-lg border transition-all duration-300 bg-white"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton circle height={40} width={40} />
              <Skeleton height={20} width={120} />
            </div>
            <Skeleton height={15} width={90} className="mb-2" />
            <Skeleton height={15} width={100} className="mb-2" />
            <Skeleton height={15} width={80} className="mb-2" />
            <Skeleton
              height={20}
              width={60}
              className="absolute bottom-2 right-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingTestCard;
