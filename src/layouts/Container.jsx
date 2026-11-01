

// Pembatas lebar isi halaman (maksimal 1440px) beserta jarak kiri-kanannya.
export default function Container({ className = '', children }) {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-5 md:px-10 xl:px-[120px] ${className}`}>
      {children}
    </div>
  );
}
