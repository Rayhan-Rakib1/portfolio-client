"use client";

export default function LoadingAbout() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-20 px-6 sm:px-10 lg:px-20 animate-pulse">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 pt-5">
        {/* Profile Image Skeleton */}
        <div className="flex-shrink-0 w-[250px] h-[250px] bg-gray-300 dark:bg-gray-700 rounded-2xl" />

        {/* About Info Skeleton */}
        <div className="flex-1 space-y-4 w-full">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/5"></div> {/* Name */}
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/5"></div> {/* Title */}
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10/12"></div>
          </div>

          {/* Skills Skeleton */}
          <div className="flex flex-wrap gap-3 mt-6">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"
                />
              ))}
          </div>

          {/* Experience Skeleton */}
          <div className="space-y-5 mt-6">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 space-y-2">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/5"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/5"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
