'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { API_URL } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'No se pudo iniciar sesión.');
        return;
      }

      const token = data.token || data.data?.token;
      const role = data.role || data.data?.role || data.user?.role || data.data?.user?.role;

      if (!token || !role) {
        setError('La respuesta del backend no incluye token o rol.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `role=${role}; path=/; max-age=86400; SameSite=Lax`;

      router.push(role === 'ADMIN' ? '/admin' : '/');
      router.refresh();
    } catch (error) {
      console.error(error);
      setError('Error al iniciar sesión. Revisa que el backend esté activo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Iniciar sesión
      </h1>

      <form onSubmit={login} className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded text-gray-900"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded text-gray-900"
        />

        {error && (
          <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white p-3 rounded hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-medium text-gray-900 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
