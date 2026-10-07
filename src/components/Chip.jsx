import React from 'react';

// PILAR 1: Props & Default Values
export default function Chip({
  children,
  variant = 'neutral', // neutral (kategori) | primary (aktif) | success | warning | discount
  size = 'md',         // sm | md
  onClick,             // Optional: kalau chip-nya bisa diklik buat filter
}) {

  // PILAR 2: Kamus Style (Warna-warna Badge Figma)
  const daftarWarna = {
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',          // Buat Kategori/Level biasa
    primary: 'bg-emerald-100 text-emerald-800 border-emerald-200', // Buat Filter Aktif / Hijau Brand
    success: 'bg-green-100 text-green-800 border-green-200',        // Buat Status "Selesai" / "Lunas"
    warning: 'bg-amber-100 text-amber-800 border-amber-200',        // Buat Status "Pending" / "Proses"
    discount: 'bg-logoYellow text-white border-logoYellow',         // Buat label "Diskon 50%"
  };

  const daftarUkuran = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  // PILAR 3: Class Combination
  const styleAkhir = `inline-flex items-center justify-center font-medium rounded-full border transition-colors select-none whitespace-nowrap ${daftarWarna[variant]} ${daftarUkuran[size]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`;

  // PILAR 4: Return HTML
  return (
    <span onClick={onClick} className={styleAkhir}>
      {children}
    </span>
  );
}
