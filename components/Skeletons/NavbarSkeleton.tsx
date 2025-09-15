// components/NavbarSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Matches your Container */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 bg-gray-800 rounded-full" /> {/* Icon placeholder */}
            <Skeleton className="h-6 w-32 bg-gray-800" /> {/* Text placeholder */}
          </div>

          {/* Desktop nav skeleton */}
          <nav className="hidden md:flex items-center space-x-6">
            <Skeleton className="h-4 w-16 bg-gray-800" /> {/* Shop */}
            <Skeleton className="h-4 w-16 bg-gray-800" /> {/* About */}
            <Skeleton className="h-4 w-16 bg-gray-800" /> {/* Contact */}
          </nav>

          {/* Client actions skeleton (cart, user, mobile menu) */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 bg-gray-800 rounded-md" /> {/* Cart */}
            <Skeleton className="h-8 w-8 bg-gray-800 rounded-full" /> {/* User */}
            <Skeleton className="h-8 w-8 bg-gray-800 rounded-md md:hidden" /> {/* Mobile menu */}
          </div>
        </div>
      </div>
    </header>
  );
}