import React from 'react';

// Garis pemisah dengan teks di tengah, contoh: ---- atau ----
export default function Divider({ children }) {
  return (
    <div className="flex items-center w-full">
      <span className="flex-1 h-px bg-borderCard" />
      {children && (
        <span className="px-2 text-base tracking-[0.2px] text-textMuted">{children}</span>
      )}
      <span className="flex-1 h-px bg-borderCard" />
    </div>
  );
}
