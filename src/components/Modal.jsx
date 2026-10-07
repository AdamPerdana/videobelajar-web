import React, { useEffect } from 'react';

// Jendela di tengah layar dengan latar gelap. Tutup dengan klik di luar atau tombol Esc.
export default function Modal({ judul, onTutup, children }) {
  useEffect(() => {
    const tekan = (e) => {
      if (e.key === 'Escape') onTutup();
    };
    document.addEventListener('keydown', tekan);
    return () => document.removeEventListener('keydown', tekan);
  }, [onTutup]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onTutup}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={judul}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[640px] max-h-full overflow-y-auto p-6 sm:p-9 bg-white rounded-[10px] text-center"
      >
        {children}
      </div>
    </div>
  );
}
