// Data contoh untuk halaman akun: profil bawaan, menu, pesanan, dan kelas saya.
// (Nantinya bisa diganti data dari API.)

// Data bawaan pengguna; ditimpa data dari API saat login (lihat AuthProvider)
export const pengguna = {
  nama: 'Jennie Ruby Jane',
  email: 'rubyjane@gmail.com',
  kodeNegara: '+62',
  noHp: '81234567890',
  foto: 'profile-photo',
};

export const menuAkun = [
  { label: 'Profil Saya', tujuan: '/profil', ikon: 'orang' },
  { label: 'Kelas Saya', tujuan: '/kelas-saya', ikon: 'bukuIsi' },
  { label: 'Pesanan Saya', tujuan: '/pesanan', ikon: 'keranjang' },
];

// Data dasar pesanan; tiap pesanan menimpa id, invoice, waktu, dan status
const pesananDasar = {
  kelasId: 2,
  judul: 'Belajar Microsoft Office dan Google Workspace untuk Pemula',
  gambar: 'course-2',
  harga: 300000,
};

export const daftarPesanan = [
  { ...pesananDasar, id: 1, invoice: 'HEL/VI/10062023', waktu: '2023-06-10T14:17', status: 'berhasil' },
  { ...pesananDasar, id: 2, invoice: 'HEL/VI/09062023', waktu: '2023-06-09T10:05', status: 'gagal' },
  { ...pesananDasar, id: 3, invoice: 'HEL/VI/08062023', waktu: '2023-06-08T19:42', status: 'menunggu' },
  { ...pesananDasar, id: 4, invoice: 'HEL/VI/07062023', waktu: '2023-06-07T08:30', status: 'berhasil' },
  { ...pesananDasar, id: 5, invoice: 'HEL/VI/06062023', waktu: '2023-06-06T16:11', status: 'berhasil' },
  { ...pesananDasar, id: 6, invoice: 'HEL/VI/05062023', waktu: '2023-06-05T13:00', status: 'menunggu' },
  { ...pesananDasar, id: 7, invoice: 'HEL/VI/04062023', waktu: '2023-06-04T09:25', status: 'berhasil' },
];

export const tabPesanan = [
  { label: 'Semua Pesanan', nilai: 'semua' },
  { label: 'Menunggu', nilai: 'menunggu' },
  { label: 'Berhasil', nilai: 'berhasil' },
  { label: 'Gagal', nilai: 'gagal' },
];

export const labelStatusPesanan = {
  berhasil: { teks: 'Berhasil', warna: 'hijau' },
  gagal: { teks: 'Gagal', warna: 'merah' },
  menunggu: { teks: 'Belum Bayar', warna: 'kuning' },
};

// `banding` = fungsi pembanding untuk Array.sort()
export const urutanPesanan = [
  { id: 'terbaru', label: 'Terbaru', banding: (a, b) => b.waktu.localeCompare(a.waktu) },
  { id: 'terlama', label: 'Terlama', banding: (a, b) => a.waktu.localeCompare(b.waktu) },
  { id: 'harga-tinggi', label: 'Harga Tinggi', banding: (a, b) => b.harga - a.harga },
  { id: 'harga-rendah', label: 'Harga Rendah', banding: (a, b) => a.harga - b.harga },
];

// Data dasar kelas yang dimiliki; tiap kelas menimpa id dan modulSelesai
const kelasDasar = {
  judul: 'Big 4 Auditor Financial Analyst',
  deskripsi: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik',
  tutor: { nama: 'Jenna Ortega', jabatan: 'Senior Accountant', perusahaan: 'Gojek' },
  gambar: 'course-6',
  avatar: 'tutor-7',
  jumlahModul: 12,
  durasiMenit: 360,
};

export const kelasSaya = [
  { ...kelasDasar, id: 6, modulSelesai: 12 },
  { ...kelasDasar, id: 7, modulSelesai: 2 },
  { ...kelasDasar, id: 8, modulSelesai: 2 },
  { ...kelasDasar, id: 9, modulSelesai: 7 },
];

// Dipakai CourseCard: kelas yang sudah dimiliki langsung dibuka di ruang belajar
export function sudahDimiliki(idKelas) {
  // id dari API berupa teks ("1"), sedangkan data contoh berupa angka (1), jadi dibandingkan sebagai teks
  return kelasSaya.some((k) => String(k.id) === String(idKelas));
}

export const tabKelasSaya = [
  { label: 'Semua Kelas', nilai: 'semua' },
  { label: 'Sedang Berjalan', nilai: 'berjalan' },
  { label: 'Selesai', nilai: 'selesai' },
];
