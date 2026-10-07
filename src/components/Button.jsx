import React from 'react';

export default function Button({
  children,
  variant = 'primary',  // primary | secondary | outline | outlinePrimary | warning
  size = 'md',          // sm | md | lg
  type = 'button',      // button | submit
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const daftarWarna = {
    primary: 'bg-brandGreen text-white hover:bg-brandGreen-hover',
    secondary: 'bg-brandGreen-light text-brandGreen hover:bg-[#D3F7C8]',
    outline: 'bg-white border border-borderCard text-textMuted hover:bg-gray-50',
    outlinePrimary: 'bg-white border border-brandGreen text-brandGreen hover:bg-brandGreen-light',
    warning: 'bg-logoYellow text-white hover:brightness-95',
  };

  const daftarUkuran = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    // Ukuran tombol di Figma. Di HP teks dan jarak sampingnya sedikit lebih kecil,
    // dan tombol boleh meninggi kalau teksnya turun ke baris kedua.
    lg: 'min-h-[42px] px-4 sm:px-[26px] py-2 text-sm sm:text-base tracking-[0.2px]',
  };

  const lebar = fullWidth ? 'w-full' : 'w-auto';
  const mati = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  const styleAkhir = `inline-flex items-center justify-center gap-2 rounded-[10px] font-bold transition-all ${lebar} ${mati} ${daftarWarna[variant]} ${daftarUkuran[size]}`;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styleAkhir}>
      {children}
    </button>
  );
}
