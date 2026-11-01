import { useState } from 'react';
import Modal from './Modal';
import Ikon from './Ikon';
import Button from './Button';

// Jendela "Tulis Review". `awal` = review yang sudah pernah dikirim (untuk diubah), atau null.
export default function ReviewModal({ awal, onTutup, onKirim }) {
  const [bintang, setBintang] = useState(awal?.bintang || 0);
  const [teks, setTeks] = useState(awal?.teks || '');

  return (
    <Modal judul="Tulis review" onTutup={onTutup}>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-lg font-bold tracking-[0.2px] text-textPrimary">Tulis Review Terbaikmu!</h2>
          <p className="text-base tracking-[0.2px] text-textSecondary">Bagaimana pengalaman belajarmu di kelas ini?</p>
        </div>

        <div role="radiogroup" aria-label="Rating" className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={bintang === n}
              aria-label={`${n} bintang`}
              onClick={() => setBintang(n)}
              className={`cursor-pointer ${n <= bintang ? 'text-star' : 'text-[#D9DBE0]'}`}
            >
              <Ikon nama="bintang" ukuran={34} />
            </button>
          ))}
        </div>

        <textarea
          aria-label="Review"
          placeholder="Masukkan Review"
          rows={3}
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          className="w-full px-4 py-3 border border-borderField rounded-[10px] outline-none resize-none text-base tracking-[0.2px] text-textPrimary placeholder:text-textSecondary focus:border-brandGreen"
        />

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outlinePrimary" size="lg" fullWidth onClick={onTutup}>
            Batal
          </Button>
          <Button variant="primary" size="lg" fullWidth disabled={bintang === 0} onClick={() => onKirim({ bintang, teks })}>
            Selesai
          </Button>
        </div>
      </div>
    </Modal>
  );
}
