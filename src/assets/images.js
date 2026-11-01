

const berkas = import.meta.glob('./*.{png,jpg,jpeg,svg,webp,gif,PNG,JPG,JPEG,SVG,WEBP,GIF}', {
  eager: true,
  import: 'default',
});

const peta = {};
for (const path in berkas) {
  const nama = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
  peta[nama] = berkas[path];
}




export function gambar(nama) {
  if (!nama) return null;
  const kunci = nama.toLowerCase();
  if (peta[kunci]) return peta[kunci];

  const bernomor = kunci.match(/^(.*)-\d+$/);
  if (bernomor) return peta[`${bernomor[1]}-1`] || null;

  return null;
}
