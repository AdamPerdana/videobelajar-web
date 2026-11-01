import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { masukUser } from '../services/api/userApi';
import { kumpulkanError, validasiEmail, validasiPassword } from '../utils/validation';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import GoogleButton from '../components/GoogleButton';

// Halaman tujuan setelah berhasil masuk
const TUJUAN = '/';

export default function Login() {
  const navigate = useNavigate();
  const { sudahLogin, login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({}); // error per kolom, mis. { email: '...' }
  const [galat, setGalat] = useState(''); // error dari server
  const [memuat, setMemuat] = useState(false);

  // Satu handler untuk semua kolom: `name` pada input menentukan field mana yang diubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((lama) => ({ ...lama, [name]: value }));
    setErrors((lama) => ({ ...lama, [name]: '' }));
    setGalat('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorBaru = kumpulkanError({
      email: validasiEmail(formData.email),
      password: validasiPassword(formData.password),
    });
    setErrors(errorBaru);
    if (Object.keys(errorBaru).length > 0) return;

    setMemuat(true);
    setGalat('');
    try {
      const user = await masukUser(formData.email.trim(), formData.password);
      login(user);
      navigate(TUJUAN, { replace: true });
    } catch (err) {
      setGalat(err.message);
    } finally {
      setMemuat(false);
    }
  };

  // Sudah login tidak perlu melihat halaman ini lagi
  if (sudahLogin) return <Navigate to={TUJUAN} replace />;

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
        <GoogleButton>Masuk dengan Google</GoogleButton>
      </form>
    </AuthLayout>
  );
}
