// components/HomeSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black h-[80vh]">
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-64 w-3/4 bg-gray-800 rounded-lg" /> {/* Placeholder for hero content */}
        </div>
      </section>

      {/* Features skeleton */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-16 bg-gray-800" /> {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full bg-gray-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products skeleton */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-16 bg-gray-800" /> {/* Title */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full bg-gray-800 rounded-lg" /> 
            ))}
          </div>
        </div>
      </section>

      {/* CTA skeleton */}
      <section className="py-24 bg-gradient-to-r from-cyan-950 via-blue-950 to-purple-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Skeleton className="h-10 w-3/4 mx-auto mb-6 bg-gray-800" /> {/* Title */}
          <Skeleton className="h-6 w-1/2 mx-auto mb-8 bg-gray-800" /> {/* Subtitle */}
          <div className="flex justify-center gap-4">
            <Skeleton className="h-10 w-32 bg-gray-800 rounded-md" />
            <Skeleton className="h-10 w-32 bg-gray-800 rounded-md" />
          </div>
        </div>
      </section>
    </div>
  );
}