import React from 'react';

// Bendera digambar pakai SVG supaya tampil sama di semua perangkat
// (emoji bendera tidak muncul di Windows).
function BenderaIndonesia() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="0" y="3" width="24" height="9" fill="#E70011" />
      <rect x="0" y="12" width="24" height="9" fill="#FFFFFF" />
    </svg>
  );
}

// Untuk menambah negara lain: tambahkan baris baru di sini
// beserta komponen benderanya.
const daftarKodeNegara = [
  { kode: '+62', nama: 'Indonesia', Bendera: BenderaIndonesia },
];

export default function PhoneField({
  label,
  name,
  kodeNegara = '+62',     // kode negara yang sedang dipilih
  onKodeChange,           // dipanggil saat kode negara diganti
  value,                  // nomor HP (tanpa kode negara)
  onChange,
  error = '',
  required = false,
}) {
  const negaraAktif = daftarKodeNegara.find((n) => n.kode === kodeNegara) || daftarKodeNegara[0];
  const Bendera = negaraAktif.Bendera;

  const borderInput = error
    ? 'border-error focus:ring-error/20'
    : 'border-borderField focus:border-brandGreen focus:ring-brandGreen/20';

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="flex items-end gap-1 pb-1 text-base tracking-[0.2px] text-textSecondary">
          {label}
          {required && <span className="font-heading text-error">*</span>}
        </label>
      )}

      <div className="flex gap-3 sm:gap-6">
        {/* Kotak kode negara */}
        <div className="relative flex shrink-0 w-[130px] sm:w-[157px] h-12 rounded-md border border-borderField overflow-hidden focus-within:border-brandGreen">
          <span className="flex items-center justify-center w-11 bg-fieldAddon border-r border-borderField">
            <Bendera />
          </span>
          <select
            aria-label="Kode negara"
            value={kodeNegara}
            onChange={onKodeChange}
            className="flex-1 min-w-0 h-full pl-2.5 pr-9 appearance-none bg-white outline-none text-base tracking-[0.2px] text-textPrimary cursor-pointer"
          >
            {daftarKodeNegara.map((n) => (
              <option key={n.kode} value={n.kode}>
                {n.kode}
              </option>
            ))}
          </select>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none"
          >
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>

        {/* Kotak nomor HP */}
        <input
          id={name}
          name={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={value}
          onChange={onChange}
          className={`flex-1 min-w-0 h-12 px-2.5 text-base tracking-[0.2px] text-textPrimary bg-white rounded-md border outline-none transition-all focus:ring-2 ${borderInput}`}
        />
      </div>

      {error && <span className="pt-1 text-xs font-medium text-error">{error}</span>}
    </div>
  );
}
