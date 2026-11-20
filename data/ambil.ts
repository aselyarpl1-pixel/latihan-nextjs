import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/data/events";
import type { Pesanan } from "@/data/pesanan";

// Mengambil semua event
export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");

  if (error) {
    throw new Error("Gagal memuat event: " + error.message);
  }

  return data as Event[];
}

// Mengambil satu event berdasarkan ID
// cache mencegah query berulang dalam satu proses render
export const ambilEvent = cache(async (id: number): Promise<Event | null> => {
  const idValid = Number(id);

  if (!Number.isInteger(idValid) || idValid <= 0) {
    return null;
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", idValid)
    .maybeSingle();

  if (error) {
    throw new Error("Gagal memuat event: " + error.message);
  }

  return data as Event | null;
});

// Mengambil event terkait
export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id)
    .order("tanggal");

  if (error) {
    throw new Error("Gagal memuat event terkait: " + error.message);
  }

  return data as Event[];
}

// Menghitung jumlah pesanan dan jumlah tiket
export async function hitungPesanan(eventId: number): Promise<{
  jumlahPesanan: number;
  jumlahTiket: number;
}> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);

  if (error) {
    console.error("ERROR HITUNG PESANAN:", error);

    throw new Error("Gagal menghitung pesanan: " + error.message);
  }

  const pesanan = data ?? [];

  const jumlahPesanan = pesanan.length;

  const jumlahTiket = pesanan.reduce(
    (total, item) => total + Number(item.jumlah),
    0,
  );

  return {
    jumlahPesanan,
    jumlahTiket,
  };
}

// Mengambil semua pesanan
export async function ambilPesanan(): Promise<Pesanan[]> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false });

  if (error) {
    throw new Error("Gagal memuat pesanan: " + error.message);
  }

  return data as Pesanan[];
}
