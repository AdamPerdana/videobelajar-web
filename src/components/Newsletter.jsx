import { useState } from 'react';
import { LatarGambar } from './Gambar';
import Button from './Button';
import { validasiEmail } from '../utils/validation';

// Banner "Mau Belajar Lebih Banyak?" beserta form berlangganan.
// State (email & status kirim) disimpan di sini karena tidak dibutuhkan halaman lain.
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (validasiEmail(email)) return; // tidak kosong string = email tidak valid

    // TODO: kirim email ke API newsletter
    setTerkirim(true);
    setEmail('');
  };

  return (
    <LatarGambar nama="newsletter-bg" className="rounded-[10px] min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-10 min-h-[400px] px-5 py-10 text-center">
        <div className="flex flex-col gap-1 max-w-[525px]">
          <p className="text-lg font-medium tracking-[0.2px] text-white/70">NEWSLETTER</p>
          <h2 className="font-heading font-semibold text-2xl sm:text-[32px] leading-[1.1] text-white">
            Mau Belajar Lebih Banyak?
          </h2>
          <p className="pt-1.5 text-base tracking-[0.2px] text-white">
            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program
            terbaik hariesok.id
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex items-center gap-2 w-full max-w-[525px] p-2 pl-5 sm:pl-8 bg-white rounded-[10px]"
        >
          <input
            type="email"
            aria-label="Email"
            placeholder="Masukkan Emailmu"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTerkirim(false);
            }}
            className="flex-1 min-w-0 h-[42px] bg-transparent outline-none text-base tracking-[0.2px] text-textPrimary placeholder:text-textSecondary"
          />
          <Button type="submit" variant="warning" size="lg">
            Subscribe
          </Button>
        </form>

        {terkirim && (
          <p role="status" className="-mt-6 text-sm text-white">
            Terima kasih, email kamu sudah terdaftar.
          </p>
        )}
      </div>
    </LatarGambar>
  );
}
