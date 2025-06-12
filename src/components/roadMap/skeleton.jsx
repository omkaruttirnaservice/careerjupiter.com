
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

// function Skeleton({ className, ...props }) {
//   return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
// }

// Card Skeleton
function CardSkeleton() {
  return (
    <div className="p-4 rounded-2xl bg-white shadow-lg">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  )
}

// Wave Path Skeleton
function WavePathSkeleton() {
  return (
    <div className="relative h-44 w-full my-4">
      <Skeleton className="h-full w-full rounded-xl" />
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-12 rounded-full" />
        ))}
      </div>
    </div>
  )
}

// Breadcrumb Skeleton
function BreadcrumbSkeleton() {
  return (
    <div className="flex items-center gap-2 p-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center">
          <Skeleton className="h-8 w-20 rounded-full" />
          {i < 2 && <Skeleton className="h-4 w-4 mx-2" />}
        </div>
      ))}
    </div>
  )
}

export { Skeleton, CardSkeleton, WavePathSkeleton, BreadcrumbSkeleton }
