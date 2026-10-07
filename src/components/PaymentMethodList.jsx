import React from 'react';
import Accordion from './Accordion';
import Gambar from './Gambar';
import Ikon from './Ikon';
import { kelompokMetode } from '../data/payment';

// Daftar metode pembayaran yang dikelompokkan dan bisa dipilih.
// terpilih    : id metode yang sedang dipilih
// onPilih     : dipanggil dengan id metode saat diklik
// awalTerbuka : semua kelompok langsung terbuka (halaman Checkout)
export default function PaymentMethodList({ terpilih, onPilih, awalTerbuka = false }) {
  return (
    <div className="flex flex-col gap-3">
      {kelompokMetode.map((kelompok) => (
        <Accordion key={kelompok.id} judul={kelompok.judul} awalTerbuka={awalTerbuka}>
          {kelompok.metode.map((m) => {
            const aktif = m.id === terpilih;
            const logo = m.gambarBanyak || [m.gambar];

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onPilih(m.id)}
                aria-pressed={aktif}
                className={`flex items-center justify-between gap-3 w-full h-14 px-5 bg-white border rounded-[10px] text-left cursor-pointer transition-colors ${aktif ? 'border-tertiary' : 'border-borderField hover:border-brandGreen'}`}
              >
                <span className="flex items-center gap-3">
                  {logo.map((nama) => (
                    <Gambar key={nama} nama={nama} alt="" fit="contain" label={false} className="w-7 h-6 rounded" />
                  ))}
                  {!m.gambarBanyak && (
                    <span className="text-base tracking-[0.2px] text-textPrimary">{m.nama}</span>
                  )}
                  {m.gambarBanyak && <span className="sr-only">{m.nama}</span>}
                </span>

                {aktif && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-tertiary text-white">
                    <Ikon nama="centang" ukuran={16} />
                  </span>
                )}
              </button>
            );
          })}
        </Accordion>
      ))}
    </div>
  );
}
