import React from 'react';

// Label status kecil: Berhasil / Gagal / Belum Bayar / Selesai / Sedang Berjalan
export default function StatusBadge({ warna = 'hijau', children }) {
  const daftarWarna = {
    hijau: 'bg-[#E0FDDF] text-[#38D189]',
    merah: 'bg-[#FFE0D7] text-error',
    kuning: 'bg-[#FFF7D7] text-logoYellow',
  };

  return (
    <span className={`inline-flex items-center h-7 px-2.5 rounded-md text-base tracking-[0.2px] whitespace-nowrap ${daftarWarna[warna]}`}>
      {children}
    </span>
  );
}
