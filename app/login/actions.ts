"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = {
  pesan: string;
  blokirSampai?: number;
};

const COOKIE_GAGAL = "login_gagal";
const BATAS_PERCOBAAN = 5;
const WAKTU_BLOKIR = 60;

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");

  const cookieStore = await cookies();

  // Membaca jumlah percobaan gagal dan waktu blokir
  const dataGagal = cookieStore.get(COOKIE_GAGAL)?.value ?? "";
  const [jumlahText, waktuText] = dataGagal.split(".");

  let jumlahGagal = Number(jumlahText) || 0;
  const waktuBlokir = Number(waktuText) || 0;

  // Periksa apakah waktu blokir masih berlaku
  if (waktuBlokir > Date.now()) {
    return {
      pesan: "Terlalu banyak percobaan login.",
      blokirSampai: waktuBlokir,
    };
  }

  // Reset hitungan jika masa blokir sudah berakhir
  if (waktuBlokir > 0 && waktuBlokir <= Date.now()) {
    jumlahGagal = 0;
    cookieStore.delete(COOKIE_GAGAL);
  }

  const sandiBenar = process.env.ADMIN_PASSWORD ?? "";

  // Membandingkan kata sandi dengan timingSafeEqual
  const inputBuffer = Buffer.from(sandi);
  const benarBuffer = Buffer.from(sandiBenar);

  const cocok =
    inputBuffer.length === benarBuffer.length &&
    timingSafeEqual(inputBuffer, benarBuffer);

  if (!cocok) {
    jumlahGagal++;

    const blokirSampai =
      jumlahGagal >= BATAS_PERCOBAAN ? Date.now() + WAKTU_BLOKIR * 1000 : 0;

    cookieStore.set(COOKIE_GAGAL, `${jumlahGagal}.${blokirSampai}`, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: WAKTU_BLOKIR,
    });

    return {
      pesan:
        jumlahGagal >= BATAS_PERCOBAAN
          ? "Terlalu banyak percobaan login."
          : `Kata sandi salah. Percobaan ${jumlahGagal} dari ${BATAS_PERCOBAAN}.`,
      blokirSampai: blokirSampai || undefined,
    };
  }

  // Hapus cookie kegagalan jika login berhasil
  cookieStore.delete(COOKIE_GAGAL);

  // Membuat cookie sesi admin
  cookieStore.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  const cookieStore = await cookies();

  cookieStore.delete(NAMA_COOKIE);
  redirect("/login");
}
