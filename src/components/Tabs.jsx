import React from 'react';

// Deretan tab dengan garis bawah oranye di tab yang aktif.
// daftar: [{ label: 'Semua Kelas', nilai: 'semua' }, ...]
export default function Tabs({ daftar, aktif, onGanti }) {
  return (
    <div role="tablist" className="flex gap-6 sm:gap-9 overflow-x-auto">
      {daftar.map((tab) => {
        const dipilih = tab.nilai === aktif;
        return (
          <button
            key={tab.nilai}
            type="button"
            role="tab"
            aria-selected={dipilih}
            onClick={() => onGanti(tab.nilai)}
            className={`relative shrink-0 pt-3 pb-5 text-base font-medium tracking-[0.2px] whitespace-nowrap cursor-pointer ${dipilih ? 'text-tertiary' : 'text-textSecondary hover:text-textPrimary'}`}
          >
            {tab.label}
            {dipilih && <span className="absolute left-0 bottom-0 w-[52px] h-1.5 rounded-[10px] bg-tertiary" />}
          </button>
        );
      })}
    </div>
  );
}
