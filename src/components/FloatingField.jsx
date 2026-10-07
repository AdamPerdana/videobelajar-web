import React from 'react';

// Kotak isian dengan label kecil yang menempel di garis atas (halaman Profil).
// Kalau "pilihan" diisi, tampil sebagai dropdown.
export default function FloatingField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error = '',
  pilihan,              // contoh: ['+62', '+60']
  inputMode,
  autoComplete,
}) {
  const border = error ? 'border-error' : 'border-borderField focus-within:border-brandGreen';
  const isi = 'w-full h-12 px-4 bg-transparent outline-none text-base tracking-[0.2px] text-textPrimary';

  return (
    <div className="flex flex-col w-full">
      <div className={`group relative rounded-md border bg-white ${border}`}>
        {label && (
          <label
            htmlFor={name}
            className={`absolute -top-2.5 left-3 px-1 bg-white text-sm leading-5 tracking-[0.2px] ${error ? 'text-error' : 'text-textSecondary group-focus-within:text-brandGreen'}`}
          >
            {label}
          </label>
        )}

        {pilihan ? (
          <select id={name} name={name} value={value} onChange={onChange} aria-label={label || name} className={`${isi} cursor-pointer`}>
            {pilihan.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            inputMode={inputMode}
            autoComplete={autoComplete}
            className={isi}
          />
        )}
      </div>

      {error && <span className="pt-1 text-xs font-medium text-error">{error}</span>}
    </div>
  );
}
