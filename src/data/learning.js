// DATA CONTOH untuk ruang belajar (halaman /belajar/:id).
// Isinya mengikuti desain Figma. Nanti diganti data dari API.

export const kelasBelajar = {
  judul: 'Foundations of User Experience Design',
  // Info yang tampil di bawah video
  materi: {
    judul: 'Praktikkan Skill dengan Technical Book',
    deskripsi: 'Pelajari dan praktikkan skill teknis dalam berbagai industri dengan Technical Book Riselearn',
    tutor: { nama: 'Jenna Ortega', jabatan: 'Senior Accountant', perusahaan: 'Gojek', avatar: 'tutor-8' },
    rating: 3.5,
    jumlahReview: 86,
  },
};

// jenis: 'video' | 'rangkuman' | 'pretest' | 'quiz' | 'ujian'
// Untuk video: isi "video" dengan alamat file video kalau sudah ada.
const video = (id) => ({ id, jenis: 'video', judul: 'Video: Introduction to HR', durasi: 12, video: '' });

export const bagianModul = [
  {
    id: 'bagian-1',
    judul: 'Introduction to HR',
    item: [
      { id: 'b1-pretest', jenis: 'pretest', judul: 'Pre-Test: Introduction to HR', jumlahSoal: 10 },
      video('b1-video-1'),
      video('b1-video-2'),
      video('b1-video-3'),
      video('b1-video-4'),
      { id: 'b1-rangkuman', jenis: 'rangkuman', judul: 'Rangkuman: Introduction to HR', durasi: 12 },
      { id: 'b1-quiz', jenis: 'quiz', judul: 'Quiz: Introduction to HR', jumlahSoal: 10 },
    ],
  },
  {
    id: 'bagian-2',
    judul: 'Introduction to HR',
    item: [
      video('b2-video-1'),
      video('b2-video-2'),
      video('b2-video-3'),
      video('b2-video-4'),
      { id: 'b2-rangkuman', jenis: 'rangkuman', judul: 'Rangkuman: Introduction to HR', durasi: 12 },
      { id: 'b2-quiz', jenis: 'quiz', judul: 'Quiz: Introduction to HR', jumlahSoal: 10 },
      { id: 'b2-ujian', jenis: 'ujian', judul: 'Ujian Akhir: Introduction to HR', jumlahSoal: 10 },
    ],
  },
];

// Teks dan aturan untuk tiap jenis tes
export const aturanTes = {
  pretest: {
    nama: 'Pretest',
    namaKecil: 'pretest',
    tombolMulai: 'Mulai Pre-Test',
    nilaiLulus: null, // pretest tidak punya syarat lulus
    pembuka: 'Kerjakan pretest dengan sebaik mungkin untuk mengukur pemahaman awalmu terkait materi yang akan kamu pelajari',
    syarat: ['Syarat Nilai Kelulusan: -', 'Durasi Ujian: 5 Menit'],
    penutup: 'Jangan khawatir, total skor tidak akan memengaruhi kelulusan dan penilaian akhirmu dalam rangkaian kelas ini',
    hasilLulus: ['Pretest sudah selesai dan kami sudah mengetahui progresmu.', 'Saatnya memulai kelas!'],
  },
  quiz: {
    nama: 'Quiz',
    namaKecil: 'quiz',
    tombolMulai: 'Mulai Quiz',
    nilaiLulus: 60,
    pembuka: 'Kerjakan quiz dengan sebaik mungkin untuk mengukur pemahaman terkait materi yang telah kamu pelajari',
    syarat: ['Syarat Nilai Kelulusan: 60%'],
    penutup: 'Kerjakan dengan sebaik mungkin untuk mencapai skor minimal agar kamu dapat melanjutkan ke modul berikutnya',
    hasilLulus: ['Quiz sudah selesai dan nilaimu memenuhi syarat kelulusan.', 'Saatnya melanjutkan ke modul berikutnya!'],
  },
  ujian: {
    nama: 'Ujian Akhir',
    namaKecil: 'ujian akhir',
    tombolMulai: 'Mulai Ujian Akhir',
    nilaiLulus: 60,
    pembuka: 'Kerjakan ujian akhir dengan sebaik mungkin untuk mengukur pemahamanmu terkait seluruh materi yang telah kamu pelajari',
    syarat: ['Syarat Nilai Kelulusan: 60%'],
    penutup: 'Kerjakan dengan sebaik mungkin untuk mencapai skor minimal agar kamu bisa mendapatkan sertifikat kelulusan kelas',
    hasilLulus: ['Ujian akhir sudah selesai dan nilaimu memenuhi syarat kelulusan.', 'Selesaikan semua modul untuk mengambil sertifikat!'],
  },
};

// Soal contoh: di desain semua soal sama, jadi di sini juga diulang.
const soalContoh = {
  pertanyaan:
    'Memikirkan dan mengantisipasi secara teliti adanya user secara tidak sengaja mengutak-atik konfigurasi, namun dapat diatasi dengan membuat default yang mengurangi kepanikan pada user adalah pengertian dari ...',
  pilihan: [
    'Memikirkan tentang default',
    'Mempertimbangkan page layout berdasarkan suatu tujuan tertentu',
    'Memastikan bahwa sistem berjalan sesuai dengan apa yang terjadi saat itu juga',
    'Menciptakan konsistensi dan menggunakan elemen UI umum',
  ],
  benar: 0, // urutan jawaban yang benar (mulai dari 0)
};

export function ambilSoal(jumlah) {
  return Array.from({ length: jumlah }, (_, i) => ({ ...soalContoh, id: i + 1 }));
}

// Sertifikat
export const sertifikat = {
  gambar: 'certificate',
  kategori: 'Desain',
  judulKelas: 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.',
  judul: 'Big 4 Auditor Financial Analyst',
  deskripsi: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik',
  tutor: { nama: 'Jenna Ortega', jabatan: 'Senior Accountant', perusahaan: 'Gojek', avatar: 'tutor-2' },
  rating: 3.5,
  jumlahReview: 86,
};
