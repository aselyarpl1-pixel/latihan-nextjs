"use client";

import { useActionState, useEffect, useState } from "react";
import { masuk, type HasilMasuk } from "@/app/login/actions";

export default function FormMasuk({ dari }: { dari: string }) {
  const [hasil, kirim, sedangKirim] = useActionState<HasilMasuk, FormData>(
    masuk,
    { pesan: "" },
  );

  const [sekarang, setSekarang] = useState(() => Date.now());

  // Memperbarui waktu setiap detik selama ada batas waktu blokir
  useEffect(() => {
    if (!hasil.blokirSampai) return;

    const interval = setInterval(() => {
      setSekarang(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [hasil.blokirSampai]);

  // Menghitung sisa waktu blokir
  const sisaWaktu = hasil.blokirSampai
    ? Math.max(0, Math.ceil((hasil.blokirSampai - sekarang) / 1000))
    : 0;

  const sedangDiblokir = sisaWaktu > 0;

  return (
    <form
      action={kirim}
      className="mx-auto max-w-sm space-y-3 rounded-xl border bg-white p-6"
    >
      <h1 className="text-xl font-bold">Masuk Admin</h1>

      <input type="hidden" name="dari" value={dari} />

      <input
        type="password"
        name="sandi"
        placeholder="Kata sandi"
        required
        disabled={sedangDiblokir || sedangKirim}
        className="block w-full rounded border px-3 py-2 disabled:bg-gray-100"
      />

      {hasil.pesan && <p className="text-sm text-red-600">{hasil.pesan}</p>}

      {sedangDiblokir && (
        <p className="text-center font-semibold text-orange-600">
          Coba lagi dalam {sisaWaktu} detik
        </p>
      )}

      <button
        disabled={sedangKirim || sedangDiblokir}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sedangKirim
          ? "Memeriksa..."
          : sedangDiblokir
            ? `Tunggu ${sisaWaktu} detik`
            : "Masuk"}
      </button>
    </form>
  );
}
