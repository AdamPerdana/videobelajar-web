import React from 'react';
import Gambar from './Gambar';
import Ikon from './Ikon';
import Chip from './Chip';
import Button from './Button';
import { hargaRibuan } from '../data/courses';

// Kartu ringkasan kelas di sisi kanan (Detail Kelas dan halaman pembayaran).
// denganGambar : tampilkan gambar kelas di atas (halaman pembayaran)
// onBeli       : kalau diisi, tombol "Beli Sekarang" dan teks penawaran tampil (Detail Kelas)
// onBagikan    : kalau diisi, tombol "Bagikan Kelas" tampil di bawahnya
export default function CourseInfoCard({ kelas, denganGambar = false, onBeli, onBagikan, labelBagikan = 'Bagikan Kelas' }) {
  return (
    <aside className="flex flex-col gap-5 p-5 sm:p-6 bg-white border border-borderField rounded-[10px]">
      {denganGambar && (
        <Gambar nama={kelas.gambar} alt={kelas.judul} className="w-full h-[180px] rounded-[10px]" />
      )}

      <h2 className="font-heading font-semibold text-lg leading-[1.2] text-textPrimary">{kelas.judul}</h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-semibold text-lg text-brandGreen">{hargaRibuan(kelas.harga)}</span>
            <span className="text-base font-medium text-textSecondary line-through">{hargaRibuan(kelas.hargaCoret)}</span>
          </div>
          <Chip variant="discount" size="sm">{kelas.diskon}</Chip>
        </div>
        {onBeli && <p className="text-sm font-medium tracking-[0.2px] text-[#0980E2]">{kelas.penawaran}</p>}
      </div>

      {(onBeli || onBagikan) && (
        <div className="flex flex-col gap-3">
          {onBeli && (
            <Button variant="primary" size="lg" fullWidth onClick={onBeli}>
              Beli Sekarang
            </Button>
          )}
          {onBagikan && (
            <Button variant="outlinePrimary" size="lg" fullWidth onClick={onBagikan}>
              {labelBagikan}
            </Button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h3 className="font-heading font-semibold text-sm text-textPrimary">Kelas Ini Sudah Termasuk</h3>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
          {kelas.termasuk.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm tracking-[0.2px] text-textSecondary">
              <Ikon nama={item.ikon} ukuran={22} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading font-semibold text-sm text-textPrimary">Bahasa Pengantar</h3>
        <p className="flex items-center gap-2 text-sm tracking-[0.2px] text-textSecondary">
          <Ikon nama="bola" ukuran={22} />
          {kelas.bahasa}
        </p>
      </div>
    </aside>
  );
}
