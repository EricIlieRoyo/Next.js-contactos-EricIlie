import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteContactButton from '@/components/DeleteContactButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FichaContactoPage({ params }: PageProps) {
  const resolvedParams = await params;
  const contactId = Number(resolvedParams.id);

  if (isNaN(contactId)) {
    notFound();
  }

  const contacto = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!contacto) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.user);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
            Ficha de Contacto #{contacto.id}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            {contacto.nombre}
          </h1>
        </div>
        <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors">
          &larr; Volver a la lista
        </Link>
      </div>

      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Información detallada del contacto guardado en la agenda:
      </p>

      <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
        <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60 last:border-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            ID
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-medium text-sm">
            #{contacto.id}
          </span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60 last:border-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Correo Electrónico
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-medium text-sm">
            {contacto.email}
          </span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-700/60 last:border-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Teléfono
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-medium text-sm">
            {contacto.numero}
          </span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Provincia
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-medium text-sm">
            {contacto.provincia}
          </span>
        </div>
      </div>

      {isAuthenticated ? (
        <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            href={`/contactos/${contacto.id}/editar`}
            className="flex-1 text-center bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md transition-all"
          >
            Modificar / Editar
          </Link>
          <DeleteContactButton contactId={contacto.id} contactName={contacto.nombre} />
        </div>
      ) : (
        <div className="text-xs text-slate-500 dark:text-slate-400 italic text-center pt-2">
          Inicia sesión para poder modificar o borrar este contacto.{' '}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 underline font-normal not-italic">
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  );
}

