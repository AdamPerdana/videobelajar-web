// Mengumpulkan semua gambar di folder ini supaya bisa dipanggil lewat nama saja,
// mis. gambar('course-1') tanpa menulis import untuk setiap file.
const berkas = import.meta.glob('./*.{png,jpg,jpeg,svg,webp,gif,PNG,JPG,JPEG,SVG,WEBP,GIF}', {
  eager: true,
  import: 'default',
});

// { 'course-1': '/assets/course-1-abc.jpg', ... } (nama file tanpa ekstensi, huruf kecil)
const peta = Object.fromEntries(
  Object.entries(berkas).map(([path, url]) => [
    path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase(),
    url,
  ])
);

// Mengembalikan URL gambar, atau null kalau tidak ada.
// Nama bernomor yang tidak ditemukan (mis. 'tutor-12') memakai gambar nomor 1 sebagai cadangan.
export function gambar(nama) {
  if (!nama) return null;
  const kunci = nama.toLowerCase();
  if (peta[kunci]) return peta[kunci];

  const bernomor = kunci.match(/^(.*)-\d+$/);
  if (bernomor) return peta[`${bernomor[1]}-1`] || null;

  return null;
}
