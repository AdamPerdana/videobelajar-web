// DATA CONTOH. Isinya mengikuti desain Figma (semua kartu sama),
// hanya kategori, harga, dan durasi yang dibedakan supaya filter bisa dicoba.
// Nanti data ini diganti dengan data dari API.

const dasar = {
  judul: 'Big 4 Auditor Financial Analyst',
  deskripsi:
    'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik',
  tutor: { nama: 'Jenna Ortega', jabatan: 'Senior Accountant', perusahaan: 'Gojek' },
  rating: 3.5,
  jumlahReview: 86,
  harga: 300,        // dalam ribuan rupiah (300 = Rp 300K)
  hargaCoret: null,  // harga sebelum diskon, kalau ada
};

export const daftarKelas = [
  { ...dasar, id: 1, gambar: 'course-1', avatar: 'tutor-1', kategori: 'Pemasaran', durasi: 3 },
  { ...dasar, id: 2, gambar: 'course-2', avatar: 'tutor-2', kategori: 'Desain', durasi: 6, harga: 100, hargaCoret: 300 },
  { ...dasar, id: 3, gambar: 'course-3', avatar: 'tutor-3', kategori: 'Pengembangan Diri', durasi: 10, harga: 100, hargaCoret: 300 },
  { ...dasar, id: 4, gambar: 'course-4', avatar: 'tutor-4', kategori: 'Bisnis Manajemen', durasi: 2 },
  { ...dasar, id: 5, gambar: 'course-5', avatar: 'tutor-5', kategori: 'Digital & Teknologi', durasi: 5 },
  { ...dasar, id: 6, gambar: 'course-6', avatar: 'tutor-6', kategori: 'Pemasaran', durasi: 9 },
  { ...dasar, id: 7, gambar: 'course-7', avatar: 'tutor-7', kategori: 'Desain', durasi: 4 },
  { ...dasar, id: 8, gambar: 'course-8', avatar: 'tutor-8', kategori: 'Pengembangan Diri', durasi: 7 },
  { ...dasar, id: 9, gambar: 'course-9', avatar: 'tutor-9', kategori: 'Bisnis Manajemen', durasi: 12 },
];

// Tab di Beranda
export const tabKategori = [
  { label: 'Semua Kelas', nilai: 'semua' },
  { label: 'Pemasaran', nilai: 'Pemasaran' },
  { label: 'Desain', nilai: 'Desain' },
  { label: 'Pengembangan Diri', nilai: 'Pengembangan Diri' },
  { label: 'Bisnis', nilai: 'Bisnis Manajemen' },
];

// Pilihan filter di halaman Kategori
export const pilihanBidang = ['Pemasaran', 'Digital & Teknologi', 'Pengembangan Diri', 'Bisnis Manajemen'];

export const pilihanHarga = [
  { id: 'murah', label: 'Di bawah Rp 200K', cocok: (harga) => harga < 200 },
  { id: 'sedang', label: 'Rp 200K - Rp 300K', cocok: (harga) => harga >= 200 && harga <= 300 },
  { id: 'mahal', label: 'Di atas Rp 300K', cocok: (harga) => harga > 300 },
];

export const pilihanDurasi = [
  { id: 'pendek', label: 'Kurang dari 4 Jam', cocok: (jam) => jam < 4 },
  { id: 'sedang', label: '4 - 8 Jam', cocok: (jam) => jam >= 4 && jam <= 8 },
  { id: 'panjang', label: 'Lebih dari 8 Jam', cocok: (jam) => jam > 8 },
];

export const pilihanUrutan = [
  { id: 'harga-rendah', label: 'Harga Rendah', banding: (a, b) => a.harga - b.harga },
  { id: 'harga-tinggi', label: 'Harga Tinggi', banding: (a, b) => b.harga - a.harga },
  { id: 'a-z', label: 'A to Z', banding: (a, b) => a.judul.localeCompare(b.judul) },
  { id: 'z-a', label: 'Z to A', banding: (a, b) => b.judul.localeCompare(a.judul) },
  { id: 'rating-tinggi', label: 'Rating Tertinggi', banding: (a, b) => b.rating - a.rating },
  { id: 'rating-rendah', label: 'Rating Terendah', banding: (a, b) => a.rating - b.rating },
];

// Isi halaman Detail Kelas (sama untuk semua kelas, mengikuti desain)
const tutorDetail = {
  nama: 'Gregorius Edrik Lawanto',
  jabatan: 'Senior Talent Acquisition',
  perusahaan: 'WingsGroup',
  cerita:
    'Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.',
};

const materi = [
  { judul: 'The basics of user experience design', jenis: 'Video', durasi: '12 Menit' },
  { judul: 'Jobs in the field of user experience', jenis: 'Video', durasi: '12 Menit' },
  { judul: 'The product development life cycle', jenis: 'Video', durasi: '12 Menit' },
];

export const detailKelas = {
  judul: 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.',
  kategori: 'Desain',
  ringkas: 'Belajar bersama tutor profesional di Video Course. Kapanpun, di manapun.',
  rating: 3.5,
  jumlahReview: 86,
  harga: 250,
  hargaCoret: 500,
  diskon: 'Diskon 50%',
  penawaran: 'Penawaran spesial tersisa 2 hari lagi!',
  gambar: 'course-1',
  deskripsi:
    'Foundations of User Experience (UX) Design adalah yang pertama dari rangkaian tujuh kursus yang akan membekali Anda dengan keterampilan yang dibutuhkan untuk melamar pekerjaan tingkat pemula dalam desain pengalaman pengguna. Desainer UX fokus pada interaksi yang dilakukan orang dengan produk seperti situs web, aplikasi seluler, dan objek fisik. Desainer UX membuat interaksi sehari-hari itu dapat digunakan, menyenangkan, dan dapat diakses. Peran seorang desainer UX tingkat pemula mungkin termasuk berempati dengan pengguna, menentukan poin rasa sakit mereka, memunculkan ide untuk solusi desain, membuat wireframe, prototipe, dan maket, dan menguji desain untuk mendapatkan umpan balik.',
  termasuk: [
    { ikon: 'ujian', label: 'Ujian Akhir' },
    { ikon: 'video', label: '49 Video' },
    { ikon: 'buku', label: '7 Dokumen' },
    { ikon: 'sertifikat', label: 'Sertifikat' },
    { ikon: 'pensil', label: 'Pretest' },
  ],
  bahasa: 'Bahasa Indonesia',
  tutor: [
    { ...tutorDetail, avatar: 'tutor-8' },
    { ...tutorDetail, avatar: 'tutor-8' },
  ],
  silabus: [
    { judul: 'Introduction to Course 1: Foundations of User Experience Design', materi },
    { judul: 'Universal design, inclusive design, and equity-focused design', materi },
    { judul: 'Introduction to design sprints', materi },
    { judul: 'Introduction to UX research', materi },
  ],
  review: [
    { nama: 'Gregorius Edrik Lawanto', asal: 'Alumni Batch 2', isi: tutorDetail.cerita, rating: 3.5, avatar: 'tutor-8' },
    { nama: 'Gregorius Edrik Lawanto', asal: 'Alumni Batch 4', isi: tutorDetail.cerita, rating: 3.5, avatar: 'tutor-8' },
  ],
};

// 300 -> "Rp 300K"
export function hargaRibuan(nilai) {
  return `Rp ${nilai}K`;
}
