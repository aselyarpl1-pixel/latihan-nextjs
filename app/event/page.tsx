import type { Metadata } from "next";
import { Suspense } from "react";

import { ambilEvents } from "@/data/ambil";
import KatalogInteraktif from "@/components/KatalogInteraktif";

export const metadata: Metadata = {
  title: "Katalog Event",
};

async function DaftarEvent() {
  const events = await ambilEvents();

  return <KatalogInteraktif events={events} />;
}

export default function HalamanEvent() {
  return (
    <Suspense
      fallback={
        <p className="py-10 text-center text-slate-500">
          Memuat daftar event...
        </p>
      }
    >
      <DaftarEvent />
    </Suspense>
  );
}
