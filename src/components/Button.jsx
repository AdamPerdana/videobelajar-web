// Gaya tombol ditaruh di luar komponen supaya tidak dibuat ulang setiap render.
const WARNA = {
  primary: 'bg-brandGreen text-white hover:bg-brandGreen-hover',
  secondary: 'bg-brandGreen-light text-brandGreen hover:bg-[#D3F7C8]',
  outline: 'bg-white border border-borderCard text-textMuted hover:bg-gray-50',
  outlinePrimary: 'bg-white border border-brandGreen text-brandGreen hover:bg-brandGreen-light',
  warning: 'bg-logoYellow text-white hover:brightness-95',
};

const UKURAN = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  // `lg` dipakai di semua tombol utama pada desain Figma
  lg: 'min-h-[42px] px-4 sm:px-[26px] py-2 text-sm sm:text-base tracking-[0.2px]',
};

// variant: primary | secondary | outline | outlinePrimary | warning
// size: sm | md | lg
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const lebar = fullWidth ? 'w-full' : 'w-auto';
  const kursor = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-bold transition-all ${lebar} ${kursor} ${WARNA[variant]} ${UKURAN[size]}`}
    >
      {children}
    </button>
  );
}
