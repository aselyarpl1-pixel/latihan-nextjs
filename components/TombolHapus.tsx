"use client";

import { hapusEvent } from "@/app/admin/actions";

export default function TombolHapus({
  id,
  judul,
}: {
  id: number;
  judul: string;
}) {
  return (
    <form
      action={hapusEvent}
      onSubmit={(e) => {
        if (!window.confirm(`Hapus event "${judul}"?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="text-red-600 underline">Hapus</button>
    </form>
  );
}
