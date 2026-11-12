export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="mb-4 h-8 w-48 animate-pulse rounded bg-slate-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-44 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
}
