import Gambar from './Gambar';

// Baris kecil: foto di kiri, nama dan keterangan di kanan.
// `keterangan` boleh berupa teks atau JSX. `className` dipasang pada kotak teks.
export default function OrangInfo({ avatar, nama, keterangan, className }) {
  return (
    <div className="flex items-center gap-2.5">
      <Gambar nama={avatar} alt="" label={false} className="w-10 h-10 rounded-[10px]" />
      <div className={className}>
        <p className="text-base font-medium tracking-[0.2px] text-textPrimary">{nama}</p>
        <p className="text-sm tracking-[0.2px] text-textSecondary">{keterangan}</p>
      </div>
    </div>
  );
}
