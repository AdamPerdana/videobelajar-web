const WARNA = {
  hijau: 'bg-[#E0FDDF] text-[#38D189]',
  merah: 'bg-[#FFE0D7] text-error',
  kuning: 'bg-[#FFF7D7] text-logoYellow',
};

// Label status pesanan / kelas. warna: hijau | merah | kuning
export default function StatusBadge({ warna = 'hijau', children }) {
  return (
    <span
      className={`inline-flex items-center h-7 px-2.5 rounded-md text-base tracking-[0.2px] whitespace-nowrap ${WARNA[warna]}`}
    >
      {children}
    </span>
  );
}
