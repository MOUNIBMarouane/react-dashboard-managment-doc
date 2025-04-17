
export function StepStatusLoading() {
  return (
    <div className="p-4 md:p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-blue-900/30 rounded w-1/3"></div>
        <div className="h-4 bg-blue-900/30 rounded w-1/4"></div>
        <div className="h-64 bg-blue-900/20 rounded"></div>
      </div>
    </div>
  );
}
