import React from 'react';
import Ikon from './Ikon';

const daftarLangkah = ['Pilih Metode', 'Bayar', 'Selesai'];

// Penanda langkah pembayaran di navbar.
// aktif    : langkah yang sedang berjalan (1, 2, atau 3)
// tertunda : true kalau pembayaran belum beres, garis terakhir tetap abu-abu
export default function Stepper({ aktif = 1, tertunda = false }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {daftarLangkah.map((label, i) => {
        const nomor = i + 1;
        const selesai = nomor < aktif;
        const sedang = nomor === aktif;
        const garisHijau = nomor <= aktif && !(tertunda && sedang);

        let warnaTeks = 'font-medium text-stepMuted';
        if (selesai) warnaTeks = 'font-medium text-textSecondary';
        if (sedang) warnaTeks = 'font-bold text-textPrimary';

        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3" aria-current={sedang ? 'step' : undefined}>
            {i > 0 && (
              <span className={`h-0.5 w-4 sm:w-10 lg:w-[72px] rounded ${garisHijau ? 'bg-brandGreen' : 'bg-stepMuted'}`} />
            )}

            {selesai ? (
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brandGreen text-white">
                <Ikon nama="centang" ukuran={16} />
              </span>
            ) : (
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full border-[3px] ${sedang ? 'border-brandGreen' : 'border-stepMuted'}`}
              >
                <span className={`w-3.5 h-3.5 rounded-full ${sedang ? 'bg-brandGreen' : 'bg-stepMuted'}`} />
              </span>
            )}

            <span className={`hidden md:inline text-base tracking-[0.2px] whitespace-nowrap ${warnaTeks}`}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
