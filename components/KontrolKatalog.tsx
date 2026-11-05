type Props = {
  cari: string;
  setCari: (value: string) => void;
  kategori: string;
  setKategori: (value: string) => void;
  urut: string;
  setUrut: (value: string) => void;
  daftarKategori: string[];
  hanyaTersedia: boolean;
  setHanyaTersedia: (value: boolean) => void;
  hargaMaksimal: string;
  setHargaMaksimal: (value: string) => void;
  resetTampilan: () => void;
};

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  urut,
  setUrut,
  daftarKategori,
  hanyaTersedia,
  setHanyaTersedia,
  hargaMaksimal,
  setHargaMaksimal,
  resetTampilan,
}: Props) {
  return (
    <>
      {/* Pencarian */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => {
            setCari(e.target.value);
            resetTampilan();
          }}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />

        {/* Kategori */}
        <select
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            resetTampilan();
          }}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>

        {/* Pengurutan */}
        <select
          value={urut}
          onChange={(e) => {
            setUrut(e.target.value);
            resetTampilan();
          }}
          className="rounded border bg-white px-3 py-2"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      {/* Penyaring lanjutan */}
      <div className="mb-5 flex flex-wrap items-center gap-4 rounded-lg border bg-slate-50 p-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => {
              setHanyaTersedia(e.target.checked);
              resetTampilan();
            }}
            className="h-4 w-4"
          />
          Hanya yang masih ada tiket
        </label>

        <label className="flex items-center gap-2 text-sm">
          Harga maksimal
          <input
            type="number"
            min="0"
            value={hargaMaksimal}
            onChange={(e) => {
              setHargaMaksimal(e.target.value);
              resetTampilan();
            }}
            placeholder="Tanpa batas"
            className="w-32 rounded border bg-white px-3 py-2"
          />
        </label>
      </div>
    </>
  );
}
