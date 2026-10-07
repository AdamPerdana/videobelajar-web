import React, { useState } from 'react';

// Ikon mata (kata sandi terlihat)
function IkonMata() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

// Ikon mata dicoret (kata sandi disembunyikan)
function IkonMataCoret() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
  );
}

export default function InputField({
  label,                  // Judul input di atas kotak
  type = 'text',          // text | email | password | tel
  name,                   // Nama field (dipakai handleChange)
  placeholder = '',
  value,
  onChange,
  error = '',             // Pesan error di bawah kotak (jika ada)
  required = false,       // Tanda bintang (wajib diisi)
  autoComplete,
}) {
  const [terlihat, setTerlihat] = useState(false);

  const isPassword = type === 'password';
  const tipeAkhir = isPassword && terlihat ? 'text' : type;

  const borderStyle = error
    ? 'border-error focus:ring-error/20'
    : 'border-borderField focus:border-brandGreen focus:ring-brandGreen/20';

  const inputStyle = `w-full h-12 px-2.5 text-base tracking-[0.2px] text-textPrimary bg-white rounded-md border outline-none transition-all focus:ring-2 ${borderStyle} ${isPassword ? 'pr-11' : ''}`;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="flex items-end gap-1 pb-1 text-base tracking-[0.2px] text-textSecondary">
          {label}
          {required && <span className="font-heading text-error">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={tipeAkhir}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputStyle}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setTerlihat(!terlihat)}
            aria-label={terlihat ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-iconMuted hover:text-textMuted cursor-pointer"
          >
            {terlihat ? <IkonMata /> : <IkonMataCoret />}
          </button>
        )}
      </div>

      {error && <span className="pt-1 text-xs font-medium text-error">{error}</span>}
    </div>
  );
}
