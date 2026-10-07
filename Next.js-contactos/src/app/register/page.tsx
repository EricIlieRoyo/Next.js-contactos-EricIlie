'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/app/actions/authActions';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await registerUser(formData);

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      router.push('/login?registered=1');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Cuenta</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="usuario@ejemplo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 text-white font-bold py-2.5 rounded hover:bg-emerald-700 transition disabled:opacity-50 mt-2"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <p className="text-sm text-gray-600 text-center mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
