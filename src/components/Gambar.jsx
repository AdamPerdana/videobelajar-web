import { gambar } from '../assets/images';

// Menampilkan gambar berdasarkan nama file (tanpa ekstensi). Kalau tidak ditemukan, pakai `cadangan`,
// dan kalau itu juga tidak ada tampil kotak abu-abu berisi nama (placeholder).
export default function Gambar({
  nama,
  cadangan,
  alt = '',
  className = '',
  fit = 'cover',
  label = true,
}) {
  const src = gambar(nama) || gambar(cadangan);

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || nama}
      title={nama}
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-[#E9EBF0] text-[11px] leading-tight text-[#8A8F99] ${className}`}
    >
      {label && <span className="px-1 text-center break-all">{nama}</span>}
    </div>
  );
}

export function LatarGambar({ nama, cadangan, className = '', children }) {
  const src = gambar(nama) || gambar(cadangan);

  return (
    <div className={`relative overflow-hidden bg-[#2B2D31] ${className}`}>
      {src && <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-black/60" />
      {!src && (
        <span className="absolute bottom-2 right-3 text-[11px] text-white/50">{nama}</span>
      )}
      <div className="relative h-full">{children}</div>
    </div>
  );
}
