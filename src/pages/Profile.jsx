import React, { useState } from 'react';
import AccountLayout from '../layouts/AccountLayout';
import FloatingField from '../components/FloatingField';
import Gambar from '../components/Gambar';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { ubahUser, simpanFoto, hapusFoto } from '../services/api/userApi';

const pilihanKode = ['+62'];

// Foto profil dipilih dari gambar yang sudah ada di src/assets (tutor-1 sampai tutor-9)
const pilihanAvatar = Array.from({ length: 9 }, (_, i) => `tutor-${i + 1}`);

export default function Profile() {
  // "tersimpan" = data yang tampil di atas, "form" = yang sedang diketik
  const { pengguna, perbarui } = useAuth();
  const tersimpan = pengguna;
  const [form, setForm] = useState(pengguna);
  const [errors, setErrors] = useState({});
  const [pesan, setPesan] = useState('');
  const [galat, setGalat] = useState(''); // pesan error dari API
  const [memuat, setMemuat] = useState(false);
  const [pilihFoto, setPilihFoto] = useState(false);

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'noHp') value = value.replace(/\D/g, '');

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setPesan('');
    setGalat('');
  };

  // Menjalankan aksi API dengan status loading dan pesan error yang sama
  const jalankan = async (aksi, pesanBerhasil) => {
    if (!pengguna.id) {
      setGalat('Sesi lama terdeteksi. Silakan keluar lalu masuk lagi.');
      return;
    }
    setMemuat(true);
    setPesan('');
    setGalat('');
    try {
      await aksi();
      setPesan(pesanBerhasil);
    } catch (err) {
      setGalat(err.message);
    } finally {
      setMemuat(false);
    }
  };

  // ADD / UPDATE foto (POST atau PUT /foto)
  const pilihAvatar = (nama) =>
    jalankan(async () => {
      perbarui(await simpanFoto(pengguna.id, nama, pengguna.fotoId));
      setPilihFoto(false);
    }, 'Foto profil diperbarui.');

  // DELETE foto (DELETE /foto/:id)
  const hapusFotoProfil = () =>
    jalankan(async () => {
      await hapusFoto(pengguna.fotoId);
      perbarui({ foto: null, fotoId: null });
      setPilihFoto(false);
    }, 'Foto profil dihapus.');

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorBaru = {};
    if (!form.nama.trim()) errorBaru.nama = 'Nama lengkap wajib diisi';
    if (!form.email.trim()) {
      errorBaru.email = 'E-Mail wajib diisi';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errorBaru.email = 'Format E-Mail tidak valid';
    }
    if (!form.noHp) {
      errorBaru.noHp = 'No. Hp wajib diisi';
    } else if (form.noHp.length < 8 || form.noHp.length > 13) {
      errorBaru.noHp = 'No. Hp harus 8-13 angka';
    }

    setErrors(errorBaru);
    if (Object.keys(errorBaru).length > 0) return;

    // UPDATE profil (PUT /users/:id)
    jalankan(async () => {
      perbarui(
        await ubahUser(pengguna.id, {
          nama: form.nama.trim(),
          email: form.email.trim(),
          kodeNegara: form.kodeNegara,
          noHp: form.noHp,
        })
      );
    }, 'Profil berhasil disimpan.');
  };

  const teksTombol = 'self-start text-base font-bold tracking-[0.2px] text-tertiary cursor-pointer hover:underline disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <AccountLayout judul="Ubah Profil" deskripsi="Ubah data diri Anda">
      <div className="flex items-center gap-4 pb-6 border-b border-borderField">
        <Gambar nama={tersimpan.foto} cadangan="avatar-user" alt="Foto profil" className="w-[92px] h-[92px] rounded" />

        <div className="min-w-0 flex flex-col gap-2">
          <p className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">{tersimpan.nama}</p>
          <p className="text-lg tracking-[0.2px] text-textPrimary break-all">{tersimpan.email}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <button type="button" disabled={memuat} onClick={() => setPilihFoto(!pilihFoto)} className={teksTombol}>
              Ganti Foto Profil
            </button>
            {tersimpan.foto && (
              <button type="button" disabled={memuat} onClick={hapusFotoProfil} className={teksTombol}>
                Hapus Foto
              </button>
            )}
          </div>
        </div>
      </div>

      {pilihFoto && (
        <div className="flex flex-col gap-3 pt-4">
          <p className="text-base font-medium tracking-[0.2px] text-textSecondary">Pilih foto profil</p>
          <div className="flex flex-wrap gap-3">
            {pilihanAvatar.map((nama) => (
              <button
                key={nama}
                type="button"
                disabled={memuat}
                aria-label={`Pilih ${nama}`}
                onClick={() => pilihAvatar(nama)}
                className={`rounded cursor-pointer border-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                  tersimpan.foto === nama ? 'border-brandGreen' : 'border-transparent'
                }`}
              >
                <Gambar nama={nama} label={false} className="w-[60px] h-[60px] rounded" />
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 pt-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_auto] gap-4">
          <FloatingField label="Nama Lengkap" name="nama" autoComplete="name" value={form.nama} onChange={handleChange} error={errors.nama} />
          <FloatingField label="E-Mail" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} error={errors.email} />
          <div className="grid grid-cols-[92px_1fr] xl:grid-cols-[92px_160px] gap-4">
            <FloatingField name="kodeNegara" value={form.kodeNegara} onChange={handleChange} pilihan={pilihanKode} />
            <FloatingField label="No. Hp" name="noHp" type="tel" inputMode="numeric" autoComplete="tel-national" value={form.noHp} onChange={handleChange} error={errors.noHp} />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-4">
          {pesan && <p role="status" className="text-base font-medium text-brandGreen">{pesan}</p>}
          {galat && <p role="alert" className="text-base font-medium text-error">{galat}</p>}
          <Button type="submit" variant="primary" size="lg" disabled={memuat}>
            {memuat ? 'Memproses...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
