import React from 'react';
import Navbar from './Navbar';

// Kerangka bersama halaman Login & Register:
// navbar + latar krem + kartu putih di tengah berisi judul dan isi form.
export default function AuthLayout({ judul, deskripsi, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-7 md:px-[120px] md:py-16">
        <div className="w-full max-w-[590px] flex flex-col gap-9 bg-white border border-borderCard rounded p-5 sm:p-9">
          <div className="flex flex-col items-center gap-2.5 text-center">
            <h1 className="font-heading font-semibold text-2xl sm:text-[32px] leading-[1.1] text-textPrimary">
              {judul}
            </h1>
            <p className="text-base tracking-[0.2px] text-textSecondary">{deskripsi}</p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
