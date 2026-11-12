export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 animate-pulse">
      {/* Kerangka kategori */}
      <div className="mb-5 h-6 w-28 rounded-lg bg-slate-200" />

      {/* Kerangka judul */}
      <div className="mb-4 h-10 w-3/4 rounded-lg bg-slate-200" />

      {/* Kerangka tanggal */}
      <div className="mb-8 h-5 w-48 rounded-lg bg-slate-200" />

      {/* Kerangka formulir */}
      <div className="h-64 w-full rounded-2xl bg-slate-200" />
    </div>
  );
}
