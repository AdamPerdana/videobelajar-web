import React from 'react';
import Ikon from './Ikon';

export default function Pagination({ halaman, jumlahHalaman, onGanti }) {
  if (jumlahHalaman <= 1) return null;

  const nomor = Array.from({ length: jumlahHalaman }, (_, i) => i + 1);
  const kotak = 'flex items-center justify-center w-10 h-10 rounded-md text-base font-medium';

  return (
    <nav aria-label="Halaman" className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={halaman === 1}
        onClick={() => onGanti(halaman - 1)}
        className={`${kotak} bg-fieldAddon text-textPrimary disabled:opacity-40 enabled:cursor-pointer`}
      >
        <Ikon nama="panahKiri" />
      </button>

      {nomor.map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === halaman ? 'page' : undefined}
          onClick={() => onGanti(n)}
          className={`${kotak} cursor-pointer ${n === halaman ? 'bg-logoYellow text-white' : 'text-textSecondary hover:bg-fieldAddon'}`}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={halaman === jumlahHalaman}
        onClick={() => onGanti(halaman + 1)}
        className={`${kotak} bg-fieldAddon text-textPrimary disabled:opacity-40 enabled:cursor-pointer`}
      >
        <Ikon nama="panahKanan" />
      </button>
    </nav>
  );
}
