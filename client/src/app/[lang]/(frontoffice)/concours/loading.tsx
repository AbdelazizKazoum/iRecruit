// /app/concours/loading.tsx
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 space-y-8">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-700">
        Chargement des offres de travail...
      </h2>

      {/* Spinner */}
      <div className="flex justify-center items-center space-x-4">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-600"></div>
      </div>

      {/* Loading Text */}
      <p className="text-lg text-gray-500">
        Veuillez patienter pendant que nous chargeons les données.
      </p>

      {/* Skeleton Placeholders */}
      <div className="space-y-4 mt-6 w-full max-w-md">
        <div className="h-8 w-full bg-gray-300 rounded-md animate-pulse" />
        <div className="h-6 w-4/5 bg-gray-300 rounded-md animate-pulse" />
        <div className="h-6 w-3/4 bg-gray-300 rounded-md animate-pulse" />
        <div className="h-8 w-full bg-gray-300 rounded-md animate-pulse" />
      </div>
    </div>
  );
}
