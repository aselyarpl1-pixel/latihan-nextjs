import Link from "next/link";
import { alamatHalaman } from "@/data/saring";

type Props = {
  s: Parameters<typeof alamatHalaman>[0];
  hal: number;
  jumlah: number;
};

export default function Halaman({ s, hal, jumlah }: Props) {
  if (jumlah <= 1) return null;

  const nomor = Array.from({ length: jumlah }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border px-3 py-2"
        >
          « Sebelumnya
        </Link>
      )}

      {nomor.map((n) => (
        <Link
          key={n}
          href={alamatHalaman(s, n)}
          aria-current={n === hal ? "page" : undefined}
          className={`rounded border px-3 py-2 ${
            n === hal
              ? "bg-blue-600 font-bold text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {n}
        </Link>
      ))}

      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border px-3 py-2"
        >
          Berikutnya »
        </Link>
      )}
    </nav>
  );
}
