// Kotak putih berbingkai yang dipakai di halaman-halaman checkout.
// Tambahan gaya (mis. jarak antar isi) dikirim lewat `className`.
export default function CheckoutCard({ className = '', children }) {
  return (
    <section className={`p-5 sm:p-6 bg-white border border-borderField rounded-[10px] ${className}`}>
      {children}
    </section>
  );
}
