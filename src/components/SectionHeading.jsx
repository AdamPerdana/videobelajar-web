// Judul bagian halaman beserta kalimat pendeknya di bawah.
// `as` mengatur level heading: 'h1' untuk judul utama halaman, 'h2' (bawaan) untuk bagian.
export default function SectionHeading({ judul, deskripsi, as: Tag = 'h2' }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Tag className="font-heading font-semibold text-2xl sm:text-[32px] leading-[1.1] text-textPrimary">{judul}</Tag>
      <p className="text-base font-medium tracking-[0.2px] text-textSecondary">{deskripsi}</p>
    </div>
  );
}
