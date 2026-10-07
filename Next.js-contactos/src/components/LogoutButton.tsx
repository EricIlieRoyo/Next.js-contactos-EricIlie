'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded transition text-sm font-medium"
    >
      Cerrar Sesión
    </button>
  );
}
