import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { masukUser } from '../services/api/userApi';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const navigate = useNavigate();
  const { sudahLogin, login } = useAuth();
  // Setelah login selalu masuk ke Beranda
  const tujuan = '/';
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [galat, setGalat] = useState(''); // pesan error dari API (email/sandi salah, server mati)
  const [memuat, setMemuat] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // hapus error saat user mengetik lagi
    setGalat('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorBaru = {};
    if (!formData.email.trim()) {
      errorBaru.email = 'E-Mail wajib diisi';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errorBaru.email = 'Format E-Mail tidak valid';
    }
    if (!formData.password) {
      errorBaru.password = 'Kata sandi wajib diisi';
    }

    setErrors(errorBaru);
    if (Object.keys(errorBaru).length > 0) return;

    // Login lewat API (GET /users?email=...)
    setMemuat(true);
    setGalat('');
    try {
      const user = await masukUser(formData.email.trim(), formData.password);
      login(user);
      navigate(tujuan, { replace: true });
    } catch (err) {
      setGalat(err.message);
    } finally {
      setMemuat(false);
    }
  };

  // Sudah login tidak perlu melihat halaman ini lagi
  if (sudahLogin) return <Navigate to={tujuan} replace />;

  return (
    <AuthLayout judul="Masuk ke Akun" deskripsi="Yuk, lanjutin belajarmu di videobelajar.">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
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

          <InputField
            label="Kata Sandi"
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
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
            {memuat ? 'Memproses...' : 'Masuk'}
          </Button>
          <Button variant="secondary" size="lg" fullWidth onClick={() => navigate('/register')}>
            Daftar
          </Button>
        </div>

        <Divider>atau</Divider>

        {/* TODO: sambungkan ke login Google */}
        <GoogleButton onClick={() => console.log('Login Google')}>Masuk dengan Google</GoogleButton>
      </form>
    </AuthLayout>
  );
}
