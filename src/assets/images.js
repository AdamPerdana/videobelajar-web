// TEMPAT GAMBAR
// Semua file gambar di folder ini (src/assets) terbaca otomatis.
// Cukup taruh file dengan NAMA yang sesuai, tidak perlu menulis import.
// Contoh: file "course-1.jpg" akan muncul di tempat bernama "course-1".
// Ekstensi bebas (png, jpg, jpeg, svg, webp), huruf besar-kecil tidak masalah.
// Daftar nama lengkap ada di DAFTAR-GAMBAR.md.
// Gambar yang sama dipakai ulang di banyak tempat, lihat penjelasan di fungsi gambar().

const berkas = import.meta.glob('./*.{png,jpg,jpeg,svg,webp,gif,PNG,JPG,JPEG,SVG,WEBP,GIF}', {
  eager: true,
  import: 'default',
});

const peta = {};
for (const path in berkas) {
  const nama = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
  peta[nama] = berkas[path];
}

// Mengembalikan alamat gambar, atau null kalau file-nya belum ada.
// Gambar bernomor dipakai ulang: kalau "course-5" belum ada, dipakai "course-1".
// Jadi cukup satu file "course-1" dan satu "tutor-1" untuk mengisi semua kartu.
export function gambar(nama) {
  if (!nama) return null;
  const kunci = nama.toLowerCase();
  if (peta[kunci]) return peta[kunci];

  const bernomor = kunci.match(/^(.*)-\d+$/);
  if (bernomor) return peta[`${bernomor[1]}-1`] || null;

  return null;
}
