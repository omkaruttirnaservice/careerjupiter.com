import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingCard() {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <Skeleton height={180} width="100%" />
      <div className="mt-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" className="mt-2" />
        <Skeleton height={15} width="90%" className="mt-2" />
        <div className="flex gap-2 mt-3">
          <Skeleton height={25} width={60} />
          <Skeleton height={25} width={80} />
        </div>
      </div>
    </div>
  );
}

export default LoadingCard;
