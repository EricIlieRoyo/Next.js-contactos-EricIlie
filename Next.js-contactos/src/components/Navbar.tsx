import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="font-extrabold text-xl tracking-tight text-white hover:text-blue-400 transition-colors flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1.5 rounded-lg text-sm">📇</span>
          Agenda App
        </Link>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="hidden sm:inline-block text-xs bg-slate-800 px-3 py-1.5 rounded-full text-slate-300 font-medium border border-slate-700">
                {session.user?.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl transition text-sm font-semibold"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition text-sm font-semibold shadow-md shadow-blue-500/20"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
