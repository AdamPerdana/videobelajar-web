import React, { useState } from 'react';
import Ikon from './Ikon';

// Tombol "Urutkan" dengan menu pilihan.
// pilihan: [{ id: 'harga-rendah', label: 'Harga Rendah' }, ...]
export default function SortDropdown({ pilihan, nilai, onUbah }) {
  const [terbuka, setTerbuka] = useState(false);
  const aktif = pilihan.find((p) => p.id === nilai);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={terbuka}
        onClick={() => setTerbuka(!terbuka)}
        className="flex items-center justify-between gap-2 h-12 min-w-[124px] px-4 bg-white border border-borderField rounded-[10px] text-base font-medium tracking-[0.2px] text-textSecondary whitespace-nowrap cursor-pointer"
      >
        {aktif ? aktif.label : 'Urutkan'}
        <Ikon nama="segitigaBawah" />
      </button>

      {terbuka && (
        <>
          {/* Lapisan tak terlihat: klik di luar menu untuk menutup */}
          <div className="fixed inset-0 z-10" onClick={() => setTerbuka(false)} />
          <ul
            role="listbox"
            className="absolute right-0 z-20 mt-2.5 w-[160px] overflow-hidden bg-white border border-borderField rounded-[10px] shadow-lg"
          >
            {pilihan.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={p.id === nilai}
                  onClick={() => {
                    onUbah(p.id);
                    setTerbuka(false);
                  }}
                  className={`w-full h-10 px-3 text-left text-sm font-medium tracking-[0.2px] cursor-pointer hover:bg-fieldAddon ${p.id === nilai ? 'bg-fieldAddon text-textPrimary' : 'text-textSecondary'}`}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
