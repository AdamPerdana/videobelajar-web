import { useState } from 'react';
import Ikon from './Ikon';

const GAYA_TOMBOL = {
  kotak: 'h-14 px-5 bg-white border border-borderField rounded-[10px] font-bold text-lg tracking-[0.2px] text-textPrimary',
  teks: 'py-1 font-heading font-semibold text-base sm:text-lg leading-[1.2] text-brandGreen',
  kartu: 'font-medium text-base tracking-[0.2px] text-textPrimary',
};

// Hanya varian `kartu` yang dibungkus kotak putih
const GAYA_BUNGKUS = {
  kotak: '',
  teks: '',
  kartu: 'p-4 sm:p-5 bg-white border border-borderField rounded-[10px]',
};

// Bagian yang bisa dibuka-tutup. varian: kotak | teks | kartu
export default function Accordion({ judul, awalTerbuka = false, varian = 'kotak', children }) {
  const [terbuka, setTerbuka] = useState(awalTerbuka);

  return (
    <div className={`flex flex-col gap-3 ${GAYA_BUNGKUS[varian]}`}>
      <button
        type="button"
        onClick={() => setTerbuka(!terbuka)}
        aria-expanded={terbuka}
        className={`flex items-center justify-between gap-3 w-full text-left cursor-pointer ${GAYA_TOMBOL[varian]}`}
      >
        <span>{judul}</span>
        <Ikon nama="panahBawah" className={`text-textSecondary transition-transform ${terbuka ? 'rotate-180' : ''}`} />
      </button>

      {terbuka && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
}
