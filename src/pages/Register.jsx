import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { daftarUser } from '../services/api/userApi';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../components/InputField';
import PhoneField from '../components/PhoneField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import GoogleButton from '../components/GoogleButton';

export default function Register() {
  const navigate = useNavigate();
  const { sudahLogin, login } = useAuth();
  // Setelah daftar selalu masuk ke Beranda
  const tujuan = '/';
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kodeNegara: '+62',
    noHp: '',
    password: '',
    konfirmasiPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [galat, setGalat] = useState(''); // pesan error dari API (email sudah terdaftar, server mati)
  const [memuat, setMemuat] = useState(false);

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    // Nomor HP hanya boleh angka
    if (name === 'noHp') value = value.replace(/\D/g, '');

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // hapus error saat user mengetik lagi
    setGalat('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorBaru = {};

    if (!formData.nama.trim()) {
      errorBaru.nama = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      errorBaru.email = 'E-Mail wajib diisi';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errorBaru.email = 'Format E-Mail tidak valid';
    }

    if (!formData.noHp) {
      errorBaru.noHp = 'No. Hp wajib diisi';
    } else if (formData.noHp.length < 8 || formData.noHp.length > 13) {
      errorBaru.noHp = 'No. Hp harus 8-13 angka';
    }

    if (!formData.password) {
      errorBaru.password = 'Kata sandi wajib diisi';
    } else if (formData.password.length < 8) {
      errorBaru.password = 'Kata sandi minimal 8 karakter';
    }

    if (!formData.konfirmasiPassword) {
      errorBaru.konfirmasiPassword = 'Konfirmasi kata sandi wajib diisi';
    } else if (formData.konfirmasiPassword !== formData.password) {
      errorBaru.konfirmasiPassword = 'Konfirmasi kata sandi tidak sama';
    }

    setErrors(errorBaru);
    if (Object.keys(errorBaru).length > 0) return;

    // Daftar lewat API (POST /users). Konfirmasi kata sandi tidak ikut dikirim.
    setMemuat(true);
    setGalat('');
    try {
      const user = await daftarUser({
        nama: formData.nama.trim(),
        email: formData.email.trim(),
        kodeNegara: formData.kodeNegara,
        noHp: formData.noHp,
        password: formData.password,
      });
      login(user);
      navigate(tujuan, { replace: true });
    } catch (err) {
      setGalat(err.message);
    } finally {
      setMemuat(false);
    }
  };

  if (sudahLogin) return <Navigate to={tujuan} replace />;

  return (
    <AuthLayout judul="Pendaftaran Akun" deskripsi="Yuk, daftarkan akunmu sekarang juga!">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <InputField
            label="Nama Lengkap"
            name="nama"
            autoComplete="name"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
            required
          />

          <InputField
            label="E-Mail"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <PhoneField
            label="No. Hp"
            name="noHp"
            kodeNegara={formData.kodeNegara}
            onKodeChange={(e) => setFormData({ ...formData, kodeNegara: e.target.value })}
            value={formData.noHp}
            onChange={handleChange}
            error={errors.noHp}
            required
          />

          <InputField
            label="Kata Sandi"
            type="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <InputField
            label="Konfirmasi Kata Sandi"
            type="password"
            name="konfirmasiPassword"
            autoComplete="new-password"
            value={formData.konfirmasiPassword}
            onChange={handleChange}
            error={errors.konfirmasiPassword}
            required
          />

          <Link
            to="/lupa-password"
            className="self-end text-base font-medium tracking-[0.2px] text-textSecondary hover:text-brandGreen"
          >
            Lupa Password?
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {galat && (
            <p role="alert" className="text-sm text-error">
              {galat}
            </p>
          )}
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={memuat}>
            {memuat ? 'Memproses...' : 'Daftar'}
          </Button>
          <Button variant="secondary" size="lg" fullWidth onClick={() => navigate('/login')}>
            Masuk
          </Button>
        </div>

        <Divider>atau</Divider>

        {/* TODO: sambungkan ke pendaftaran Google */}
        <GoogleButton onClick={() => console.log('Daftar Google')}>Daftar dengan Google</GoogleButton>
      </form>
    </AuthLayout>
  );
}
