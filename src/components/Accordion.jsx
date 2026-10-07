import React, { useState } from 'react';
import Ikon from './Ikon';

// Judul yang bisa dibuka-tutup.
// varian "kotak": judul di dalam kotak bergaris (metode pembayaran, tata cara)
// varian "teks" : judul hijau tanpa kotak (silabus di detail kelas)
// varian "kartu": judul dan isi berada dalam satu kotak (tata cara pembayaran)
export default function Accordion({ judul, awalTerbuka = false, varian = 'kotak', children }) {
  const [terbuka, setTerbuka] = useState(awalTerbuka);

  const daftarStyleTombol = {
    kotak: 'h-14 px-5 bg-white border border-borderField rounded-[10px] font-bold text-lg tracking-[0.2px] text-textPrimary',
    teks: 'py-1 font-heading font-semibold text-base sm:text-lg leading-[1.2] text-brandGreen',
    kartu: 'font-medium text-base tracking-[0.2px] text-textPrimary',
  };
  const styleTombol = daftarStyleTombol[varian];

  const styleBungkus =
    varian === 'kartu' ? 'p-4 sm:p-5 bg-white border border-borderField rounded-[10px]' : '';

  return (
    <div className={`flex flex-col gap-3 ${styleBungkus}`}>
      <button
        type="button"
        onClick={() => setTerbuka(!terbuka)}
        aria-expanded={terbuka}
        className={`flex items-center justify-between gap-3 w-full text-left cursor-pointer ${styleTombol}`}
      >
        <span>{judul}</span>
        <Ikon
          nama="panahBawah"
          className={`text-textSecondary transition-transform ${terbuka ? 'rotate-180' : ''}`}
        />
      </button>

      {terbuka && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
}
