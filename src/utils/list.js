// Fungsi bantu untuk daftar yang bisa dicari dan dibagi per halaman
// (dipakai di Catalog, MyCourses, dan Orders).

// Cocok kalau `judul` mengandung `kataCari` (tanpa peduli huruf besar/kecil).
// Kata cari kosong = semua cocok.
export function cocokKataCari(judul, kataCari) {
  const kata = kataCari.trim().toLowerCase();
  return !kata || judul.toLowerCase().includes(kata);
}

// Membagi daftar jadi halaman. Nomor halaman otomatis dibatasi supaya tidak
// melewati halaman terakhir (misal setelah filter membuat hasil lebih sedikit).
export function bagiHalaman(daftar, halaman, perHalaman) {
  const jumlahHalaman = Math.max(1, Math.ceil(daftar.length / perHalaman));
  const halamanAktif = Math.min(halaman, jumlahHalaman);
  const tampil = daftar.slice((halamanAktif - 1) * perHalaman, halamanAktif * perHalaman);
  return { tampil, halamanAktif, jumlahHalaman };
}
