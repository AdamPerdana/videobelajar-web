import CourseInfoCard from './CourseInfoCard';

// Susunan dua kolom halaman checkout: isi halaman di kiri, kartu info kelas di kanan.
// Di layar kecil kartu info kelas tampil di atas (flex-col-reverse).
export default function CheckoutGrid({ kelas, children }) {
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-6 lg:gap-9">
      <div className="flex-1 min-w-0 flex flex-col gap-6 md:gap-9">{children}</div>

      <div className="w-full lg:w-[366px] lg:shrink-0">
        <CourseInfoCard kelas={kelas} denganGambar />
      </div>
    </div>
  );
}
