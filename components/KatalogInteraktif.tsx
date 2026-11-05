"use client";

import { useState } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [jumlahTampil, setJumlahTampil] = useState(4);

  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  // Penyaringan event
  const hasil = events.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());

    const cocokKategori = kategori === "Semua" || e.kategori === kategori;

    const cocokTiket = !hanyaTersedia || e.kuota - e.terisi > 0;

    const cocokHarga = hargaMaksimal === "" || e.harga <= Number(hargaMaksimal);

    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  // Pengurutan event
  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  // Statistik katalog
  const totalHarga = tersusun.reduce((total, e) => total + e.harga, 0);

  const rataRata = tersusun.length > 0 ? totalHarga / tersusun.length : 0;

  const totalSisa = tersusun.reduce(
    (total, e) => total + (e.kuota - e.terisi),
    0,
  );

  return (
    <div>
      {/* Semua tampilan kontrol dipindahkan ke komponen baru */}
      <KontrolKatalog
        cari={cari}
        setCari={setCari}
        kategori={kategori}
        setKategori={setKategori}
        urut={urut}
        setUrut={setUrut}
        daftarKategori={daftarKategori}
        hanyaTersedia={hanyaTersedia}
        setHanyaTersedia={setHanyaTersedia}
        hargaMaksimal={hargaMaksimal}
        setHargaMaksimal={setHargaMaksimal}
        resetTampilan={() => setJumlahTampil(4)}
      />

      {/* Statistik */}
      <p className="mb-3 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>

      <p className="mb-4 text-sm text-slate-600">
        Rata-rata harga {rupiah(rataRata)} · Total sisa tiket {totalSisa}
      </p>

      {/* Daftar event */}
      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tersusun.slice(0, jumlahTampil).map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {jumlahTampil < tersusun.length && (
            <button
              onClick={() => setJumlahTampil((prev) => prev + 4)}
              className="mt-6 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Tampilkan Lagi
            </button>
          )}
        </>
      )}
    </div>
  );
}
