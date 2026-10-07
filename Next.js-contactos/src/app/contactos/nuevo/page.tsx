import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { createContacto } from '@/app/actions/contactActions';
import Link from 'next/link';

export default async function NuevoContactoPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Añadir Contacto</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          Cancelar
        </Link>
      </div>

      <form action={createContacto} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. Juan Pérez"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. juan@ejemplo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Número de Teléfono</label>
          <input
            type="tel"
            name="numero"
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. 600 000 000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Provincia</label>
          <select
            name="provincia"
            required
            className="w-full border border-gray-300 rounded p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Murcia">Murcia</option>
            <option value="Castellón">Castellón</option>
            <option value="Valencia">Valencia</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2.5 rounded hover:bg-blue-700 transition mt-2"
        >
          Guardar Contacto
        </button>
      </form>
    </div>
  );
}
