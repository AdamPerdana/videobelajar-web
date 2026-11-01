const WARNA = {
  neutral: 'bg-gray-100 text-gray-700 border-gray-200',
  primary: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  discount: 'bg-logoYellow text-white border-logoYellow',
};

const UKURAN = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

// Label kecil berbentuk pil (mis. "Diskon 50%").
// variant: neutral | primary | success | warning | discount, size: sm | md
export default function Chip({ children, variant = 'neutral', size = 'md' }) {
  return (
    <span
      className={`inline-flex items-center justify-center font-medium rounded-full border transition-colors select-none whitespace-nowrap ${WARNA[variant]} ${UKURAN[size]}`}
    >
      {children}
    </span>
  );
}
