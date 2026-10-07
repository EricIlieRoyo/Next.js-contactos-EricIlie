import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import { updateContacto } from '@/app/actions/contactActions';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarContactoPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!dbUser) {
    redirect('/login');
  }

  const resolvedParams = await params;
  const contactId = Number(resolvedParams.id);
  const currentUserId = dbUser.id;

  if (isNaN(contactId)) {
    notFound();
  }

  const contacto = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!contacto) {
    notFound();
  }

  if (contacto.userId !== currentUserId) {
    redirect('/');
  }

  const updateContactoWithId = updateContacto.bind(null, contacto.id);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Editar Contacto #{contacto.id}</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          Cancelar
        </Link>
      </div>

      <form action={updateContactoWithId} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            defaultValue={contacto.nombre}
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            defaultValue={contacto.email}
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Número de Teléfono</label>
          <input
            type="tel"
            name="numero"
            defaultValue={contacto.numero}
            required
            className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Provincia</label>
          <select
            name="provincia"
            defaultValue={contacto.provincia}
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
          className="bg-amber-500 text-white font-bold py-2.5 rounded hover:bg-amber-600 transition mt-2"
        >
          Actualizar Contacto
        </button>
      </form>
    </div>
  );
}
