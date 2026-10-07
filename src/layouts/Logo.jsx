import React from 'react';
import { gambar } from '../assets/images';

// Logo videobelajar. Memakai file src/assets/VideoBelajarLogo.(png/svg) kalau ada,
// kalau belum ada tampil sebagai teks.
export default function Logo({ className = '' }) {
  const src = gambar('VideoBelajarLogo');

  if (src) {
    return <img src={src} alt="videobelajar" className={`h-[26px] sm:h-[30px] w-auto ${className}`} />;
  }

  return (
    <span
      className={`font-heading font-medium text-2xl sm:text-[32px] leading-none bg-gradient-to-r from-logoYellow from-45% via-logoOrange via-65% to-logoYellow to-90% bg-clip-text text-transparent ${className}`}
    >
      videobelajar
    </span>
  );
}
