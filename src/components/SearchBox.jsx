import React from 'react';
import Ikon from './Ikon';

// Kotak pencarian "Cari Kelas"
export default function SearchBox({ nilai, onUbah, placeholder = 'Cari Kelas', className = '' }) {
  return (
    <label
      className={`flex items-center gap-2 min-w-0 h-12 px-4 bg-white border border-borderField rounded-[10px] focus-within:border-brandGreen ${className}`}
    >
      <input
        type="search"
        aria-label={placeholder}
        placeholder={placeholder}
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        className="flex-1 min-w-0 bg-transparent outline-none text-base font-medium tracking-[0.2px] text-textPrimary placeholder:text-textSecondary"
      />
      <Ikon nama="cari" className="text-textSecondary" />
    </label>
  );
}
