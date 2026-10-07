import React, { useEffect, useRef, useState } from 'react';
import AccountLayout from '../layouts/AccountLayout';
import FloatingField from '../components/FloatingField';
import Gambar from '../components/Gambar';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const pilihanKode = ['+62'];

export default function Profile() {
  // "tersimpan" = data yang tampil di atas, "form" = yang sedang diketik
  const { pengguna, perbarui } = useAuth();
  const tersimpan = pengguna;
  const [form, setForm] = useState(pengguna);
  const [errors, setErrors] = useState({});
  const [pesan, setPesan] = useState('');
  const [fotoBaru, setFotoBaru] = useState(null);
  const inputFoto = useRef(null);

  // Bersihkan alamat pratinjau foto saat diganti atau halaman ditutup
  useEffect(() => {
    return () => {
      if (fotoBaru) URL.revokeObjectURL(fotoBaru);
    };
  }, [fotoBaru]);

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'noHp') value = value.replace(/\D/g, '');

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setPesan('');
  };

  const pilihFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // TODO: unggah file ke API, untuk sekarang hanya pratinjau
    setFotoBaru(URL.createObjectURL(file));
  };

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

    // TODO: kirim perubahan ke API
    perbarui(form);
    setPesan('Profil berhasil disimpan.');
  };

  return (
    <AccountLayout judul="Ubah Profil" deskripsi="Ubah data diri Anda">
      <div className="flex items-center gap-4 pb-6 border-b border-borderField">
        {fotoBaru ? (
          <img src={fotoBaru} alt="Foto profil" className="w-[92px] h-[92px] rounded object-cover" />
        ) : (
          <Gambar nama={tersimpan.foto} cadangan="avatar-user" alt="Foto profil" className="w-[92px] h-[92px] rounded" />
        )}

        <div className="min-w-0 flex flex-col gap-2">
          <p className="font-heading font-semibold text-xl leading-[1.2] text-textPrimary">{tersimpan.nama}</p>
          <p className="text-lg tracking-[0.2px] text-textPrimary break-all">{tersimpan.email}</p>
          <button
            type="button"
            onClick={() => inputFoto.current.click()}
            className="self-start text-base font-bold tracking-[0.2px] text-tertiary cursor-pointer hover:underline"
          >
            Ganti Foto Profil
          </button>
          <input ref={inputFoto} type="file" accept="image/*" onChange={pilihFoto} className="hidden" />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 pt-2">
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
          <Button type="submit" variant="primary" size="lg">
            Simpan
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
