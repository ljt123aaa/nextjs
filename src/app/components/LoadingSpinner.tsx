'use client';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin dark:border-gray-700 dark:border-t-white" style={{ animationDuration: '0.5s' }}></div>
    </div>
  );
}

export default LoadingSpinner;
