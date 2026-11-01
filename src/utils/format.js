// Fungsi pemformat tampilan (angka, harga, tanggal).
// Dipisah dari folder `data/` supaya data hanya berisi data, dan fungsi bantu ada di sini.

// 767500 -> "Rp 767.500"
export function rupiah(nilai) {
  return `Rp ${nilai.toLocaleString('id-ID')}`;
}

// Harga kelas disimpan dalam ribuan: 250 -> "Rp 250K"
export function hargaRibuan(nilai) {
  return `Rp ${nilai}K`;
}

// Waktu pembayaran di halaman Pesanan, jam 24 jam pakai titik: "10 Juni 2023, 14.17"
export function formatWaktu(waktu) {
  const d = new Date(waktu);
  const tanggal = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const jam = `${String(d.getHours()).padStart(2, '0')}.${String(d.getMinutes()).padStart(2, '0')}`;
  return `${tanggal}, ${jam}`;
}

// Waktu pengerjaan quiz di halaman Hasil, jam format AM/PM: "10 Juni 2023, 02:17 PM"
// (sengaja beda dengan formatWaktu karena mengikuti desain masing-masing halaman)
export function formatWaktuTes(waktu) {
  const d = new Date(waktu);
  const tanggal = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const jam = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return `${tanggal}, ${jam}`;
}
